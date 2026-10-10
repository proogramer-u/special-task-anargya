import 'server-only';
import {randomUUID,createHash} from 'node:crypto';
import {pool,sqlTransaction} from './database';
import type {PoolClient} from 'pg';
import type {Product,Order,Customer,CartItem} from './model';
export const hash=(value:string)=>createHash('sha256').update(value).digest('hex');
const productColumns='id,name,description,category,price,stock,image,active';
function product(row:Product):Product{return {...row,price:Number(row.price)};}
export async function allProducts(){return (await pool().query(`SELECT ${productColumns} FROM commerce.products ORDER BY sort_order`)).rows.map(product);}
export async function products(){return (await pool().query(`SELECT ${productColumns} FROM commerce.products WHERE active ORDER BY sort_order`)).rows.map(product);}
export async function addProduct(p:Product){await pool().query('INSERT INTO commerce.products(id,name,description,category,price,stock,image,active) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)',[p.id,p.name,p.description,p.category,p.price,p.stock,p.image,p.active]);return p;}
export async function updateProduct(id:string,p:Omit<Product,'id'>){const result=await pool().query(`UPDATE commerce.products SET name=$2,description=$3,category=$4,price=$5,stock=$6,image=$7,active=$8 WHERE id=$1 RETURNING ${productColumns}`,[id,p.name,p.description,p.category,p.price,p.stock,p.image,p.active]);if(!result.rows[0])throw Error('Product not found.');return product(result.rows[0]);}
export async function deleteProduct(id:string){await pool().query('DELETE FROM commerce.products WHERE id=$1',[id]);}
async function orderFrom(client:PoolClient,row:Record<string,unknown>):Promise<Order>{
 const lines=await client.query('SELECT product_id AS id,name,quantity,price FROM commerce.order_items WHERE reference=$1 ORDER BY position',[row.reference]);
 return {reference:row.reference as string,tokenHash:row.token_hash as string,idempotency:row.idempotency as string,createdAt:new Date(row.created_at as string).toISOString(),customer:row.customer as Customer,total:Number(row.total),status:row.status as Order['status'],items:lines.rows.map(i=>({...i,price:Number(i.price)}))};
}
export async function findOrder(reference:string,tokenHash?:string){return sqlTransaction(async c=>{const result=await c.query('SELECT * FROM commerce.orders WHERE reference=$1'+(tokenHash!==undefined?' AND token_hash=$2':''),tokenHash!==undefined?[reference,tokenHash]:[reference]);return result.rows[0]?orderFrom(c,result.rows[0]):undefined;});}
export async function allOrders(){return sqlTransaction(async c=>{const rows=(await c.query('SELECT * FROM commerce.orders ORDER BY created_at DESC')).rows;const results:Order[]=[];for(const row of rows)results.push(await orderFrom(c,row));return results;});}
export async function createOrder(customer:Customer,items:CartItem[],idempotency:string,token:string){return sqlTransaction(async c=>{
 const tokenHash=hash(token);
 // Transaction-scoped lock is compatible with Supavisor and serializes retries across instances.
 await c.query('SELECT pg_advisory_xact_lock(hashtextextended($1,0))',['checkout:'+idempotency+':'+tokenHash]);
 const old=(await c.query('SELECT * FROM commerce.orders WHERE idempotency=$1 AND token_hash=$2',[idempotency,tokenHash])).rows[0];if(old)return orderFrom(c,old);
 const locked=(await c.query(`SELECT ${productColumns} FROM commerce.products WHERE id=ANY($1::text[]) ORDER BY id FOR UPDATE`,[items.map(i=>i.id)])).rows.map(product);
 const lines=items.map(i=>{const p=locked.find(p=>p.id===i.id&&p.active);if(!p||p.stock<i.quantity)throw Error('A product is unavailable or its stock changed. Review your cart.');return {id:p.id,name:p.name,quantity:i.quantity,price:p.price};});
 const total=lines.reduce((sum,i)=>sum+i.price*i.quantity,0);const reference='ANR-'+randomUUID().toUpperCase();
 const row=(await c.query("INSERT INTO commerce.orders(reference,token_hash,idempotency,customer,total,status) VALUES ($1,$2,$3,$4,$5,'submitted') RETURNING *",[reference,tokenHash,idempotency,JSON.stringify(customer),total])).rows[0];
 for(const [position,line] of lines.entries()){await c.query('UPDATE commerce.products SET stock=stock-$2 WHERE id=$1',[line.id,line.quantity]);await c.query('INSERT INTO commerce.order_items VALUES($1,$2,$3,$4,$5,$6)',[reference,position,line.id,line.name,line.quantity,line.price]);}
 return orderFrom(c,row);
});}
export async function updateOrderStatus(reference:string,status:Order['status']){return sqlTransaction(async c=>{
 const order=(await c.query('SELECT * FROM commerce.orders WHERE reference=$1 FOR UPDATE',[reference])).rows[0];if(!order)throw Error('Order not found.');
 if(order.status==='cancelled'&&status!=='cancelled')throw Error('Cancelled orders cannot be reopened.');
 if(status==='cancelled'&&order.status!=='cancelled'){
  const lines=(await c.query('SELECT product_id,quantity FROM commerce.order_items WHERE reference=$1 ORDER BY product_id',[reference])).rows;
  for(const line of lines)await c.query('UPDATE commerce.products SET stock=stock+$2 WHERE id=$1',[line.product_id,line.quantity]);
 }
 await c.query('UPDATE commerce.orders SET status=$2 WHERE reference=$1',[reference,status]);
});}
export async function saveSession(tokenHash:string,version:string){await pool().query("INSERT INTO commerce.admin_sessions VALUES($1,$2,now()+interval '8 hours')",[tokenHash,version]);await pool().query('DELETE FROM commerce.admin_sessions WHERE expires_at<now() OR credential_version<>$1',[version]);}
export async function validSession(tokenHash:string,version:string){return Boolean((await pool().query('SELECT 1 FROM commerce.admin_sessions WHERE hash=$1 AND credential_version=$2 AND expires_at>now()',[tokenHash,version])).rowCount);}
export async function deleteSession(tokenHash:string){await pool().query('DELETE FROM commerce.admin_sessions WHERE hash=$1',[tokenHash]);}
export async function consumeLimit(key:string,max:number){
 await pool().query('DELETE FROM commerce.rate_limits WHERE reset_at<now()-interval \'1 day\'');
 const result=await pool().query(`INSERT INTO commerce.rate_limits VALUES($1,1,now()+interval '10 minutes') ON CONFLICT(key) DO UPDATE SET count=CASE WHEN commerce.rate_limits.reset_at<=now() THEN 1 ELSE commerce.rate_limits.count+1 END,reset_at=CASE WHEN commerce.rate_limits.reset_at<=now() THEN now()+interval '10 minutes' ELSE commerce.rate_limits.reset_at END RETURNING count`,[key]);
 if(result.rows[0].count>max)throw Error('Too many requests. Try again in ten minutes.');
}
