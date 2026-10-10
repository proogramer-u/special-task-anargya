/* eslint-disable @typescript-eslint/no-require-imports -- Node integration CLI. */
const assert=require('node:assert/strict');const crypto=require('node:crypto');
const base=process.env.BASE_URL||'http://127.0.0.1:3003';let cookie='';
async function api(route,method='GET',body,extra={}){return fetch(base+route,{method,headers:{Origin:base,'Content-Type':'application/json',...(cookie?{Cookie:cookie}:{}),...extra},...(body?{body:JSON.stringify(body)}:{})});}
(async()=>{
 assert.equal((await api('/api/admin/products')).status,401);
 assert.equal((await api('/api/admin/orders')).status,401);
 assert.equal((await api('/api/admin/products','POST',{})).status,401);
 assert.equal((await api('/api/admin/session','POST',{password:'wrong'})).status,401);
 const password=process.env.TEST_ADMIN_PASSWORD;
 const login=await api('/api/admin/session','POST',{password});assert.equal(login.status,200);cookie=login.headers.get('set-cookie').split(';')[0];assert.match(login.headers.get('set-cookie'),/HttpOnly/i);assert.match(login.headers.get('set-cookie'),/SameSite=strict/i);
 assert.equal((await api('/api/admin/products','POST',{}, {Origin:'https://attacker.example'})).status,400);
 assert.equal((await api('/api/admin/products','POST',{padding:'x'.repeat(22000)})).status,400);
 const data={name:'Demo QA product',description:'Temporary integration-test demo product.',category:'Testing',price:12000,stock:5,image:'/images/shop/tote.svg',active:true};
 assert.equal((await api('/api/admin/products','POST',{...data,price:-1})).status,400);
 const create=await api('/api/admin/products','POST',data);assert.equal(create.status,201);const p=await create.json();
 assert.equal((await api('/api/admin/products/'+p.id,'PUT',{...data,price:16000})).status,200);
 const token=crypto.randomBytes(32).toString('hex');const headers={'x-order-token':token};const body={customer:{name:'Demo QA Customer',email:'qa@example.invalid',phone:'+628123456789',address:'Demo address for local QA only'},items:[{id:p.id,quantity:2,price:1}],idempotency:crypto.randomUUID()};
 assert.equal((await api('/api/shop/orders','POST',{...body,customer:{...body.customer,email:'invalid'}},headers)).status,400);
 assert.equal((await api('/api/shop/orders','POST',{...body,items:[{id:p.id,quantity:0}]},headers)).status,400);
 const orderResponse=await api('/api/shop/orders','POST',body,headers);assert.equal(orderResponse.status,201);const {reference}=await orderResponse.json();
 assert.equal((await api('/api/shop/orders/'+reference)).status,404);
 let order=await (await api('/api/shop/orders/'+reference,'GET',undefined,headers)).json();assert.equal(order.total,32000);assert.equal(order.items[0].price,16000);
 const repeat=await (await api('/api/shop/orders','POST',body,headers)).json();assert.equal(repeat.reference,reference);
 let products=await (await api('/api/admin/products')).json();assert.equal(products.find(x=>x.id===p.id).stock,3);
 const excessive={...body,idempotency:crypto.randomUUID(),items:[{id:p.id,quantity:4}]};assert.equal((await api('/api/shop/orders','POST',excessive,headers)).status,400);
 assert.equal((await api('/api/admin/orders/'+reference,'PATCH',{status:'processing'})).status,200);
 order=await (await api('/api/shop/orders/'+reference,'GET',undefined,headers)).json();assert.equal(order.status,'processing');
 assert.equal((await api('/api/admin/orders/'+reference,'PATCH',{status:'cancelled'})).status,200);
 assert.equal((await api('/api/admin/orders/'+reference,'PATCH',{status:'processing'})).status,400);
 products=await (await api('/api/admin/products')).json();assert.equal(products.find(x=>x.id===p.id).stock,5);
 assert.equal((await api('/api/admin/products/'+p.id,'DELETE')).status,200);
 const adminOrders=await (await api('/api/admin/orders')).json();assert.ok(adminOrders.find(o=>o.reference===reference));
 const manifest=await (await fetch(base+'/manifest.webmanifest')).json();assert.equal(manifest.display,'standalone');assert.ok(manifest.icons.some(i=>i.sizes==='512x512'));assert.equal((await fetch(base+'/sw.js')).status,200);
 for(const route of ['/','/team','/vehicles','/achievements','/research','/sponsors','/shop','/shop/cart','/shop/checkout','/offline'])assert.equal((await fetch(base+route)).status,200,route);
 const dashboard=await api('/admin');assert.equal(dashboard.status,200);assert.ok((await dashboard.text()).includes(reference),'persisted order appears in admin HTML');
 if(process.send)process.send({reference});
 assert.equal((await api('/api/admin/session','DELETE')).status,200);assert.equal((await api('/api/admin/orders')).status,401);
 console.log('PASS: catalog, product CRUD, checkout validation, server price/stock, idempotency, private order retrieval, status/cancellation, auth/CSRF/logout, manifest and all LOW routes.');

})().catch(e=>{console.error(e);process.exitCode=1;});
