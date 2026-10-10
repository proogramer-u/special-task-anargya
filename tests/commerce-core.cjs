/* eslint-disable @typescript-eslint/no-require-imports -- Node integration runner. */
const fs=require('node:fs');const path=require('node:path');const assert=require('node:assert/strict');const ts=require('typescript');const crypto=require('node:crypto');
if(!process.env.TEST_DATABASE_URL){console.error('BLOCKED: set TEST_DATABASE_URL to an isolated migrated PostgreSQL test database.');process.exit(2);}
process.env.DATABASE_URL=process.env.TEST_DATABASE_URL;
fs.mkdirSync(path.join(process.cwd(),'.data'),{recursive:true,mode:0o700});const temp=fs.mkdtempSync(path.join(process.cwd(),'.data/db-test-'));
for(const name of ['model','database','store','password']){const code=ts.transpileModule(fs.readFileSync(`src/lib/commerce/${name}.ts`,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,esModuleInterop:true}}).outputText.replace(/require\("\.\/(\w+)"\)/g,'require("./$1.cjs")');fs.writeFileSync(path.join(temp,name+'.cjs'),code);}
(async()=>{const s=require(path.join(temp,'store.cjs'));const db=require(path.join(temp,'database.cjs'));const pw=require(path.join(temp,'password.cjs'));const model=require(path.join(temp,'model.cjs'));
assert.throws(()=>model.validateCheckout({items:[]}));
const password='Integration-only-long-password';const encoded=await pw.hashPassword(password);assert.equal(await pw.checkPassword(password,encoded),true);assert.equal(await pw.checkPassword('wrong',encoded),false);assert.equal(await pw.checkPassword(password,'old:hash'),false);
const id=crypto.randomUUID();const customer={name:'Fictional QA',email:'qa@example.invalid',phone:'123456789',address:'Fictional test address'};const token=crypto.randomBytes(32).toString('hex');const key=crypto.randomUUID();let references=[];
try{await s.addProduct({id,name:'QA test',description:'Temporary integration test',category:'Testing',price:12345,stock:2,image:'/images/shop/shirt.svg',active:true});
const duplicate=await Promise.all([s.createOrder(customer,[{id,quantity:1}],key,token),s.createOrder(customer,[{id,quantity:1}],key,token)]);assert.equal(duplicate[0].reference,duplicate[1].reference);references.push(duplicate[0].reference);assert.equal((await s.allProducts()).find(p=>p.id===id).stock,1);assert.equal(duplicate[0].total,12345);
assert.equal(await s.findOrder(references[0],s.hash('wrong')),undefined);
const race=await Promise.allSettled([s.createOrder(customer,[{id,quantity:1}],crypto.randomUUID(),token),s.createOrder(customer,[{id,quantity:1}],crypto.randomUUID(),token)]);assert.equal(race.filter(r=>r.status==='fulfilled').length,1);references.push(...race.filter(r=>r.status==='fulfilled').map(r=>r.value.reference));
await assert.rejects(s.createOrder(customer,[{id,quantity:1}],crypto.randomUUID(),token));
await Promise.all([s.updateOrderStatus(references[0],'cancelled'),s.updateOrderStatus(references[0],'cancelled')]);assert.equal((await s.allProducts()).find(p=>p.id===id).stock,1);await assert.rejects(s.updateOrderStatus(references[0],'processing'));
await s.updateProduct(id,{name:'Edited',description:'Edited test description',category:'Testing',price:15000,stock:4,image:'/images/shop/shirt.svg',active:true});assert.equal((await s.allProducts()).find(p=>p.id===id).price,15000);
// Multi-line failure must roll back earlier decrements.
await assert.rejects(s.createOrder(customer,[{id,quantity:1},{id:'missing-test',quantity:1}],crypto.randomUUID(),token));assert.equal((await s.allProducts()).find(p=>p.id===id).stock,4);
// A SQL constraint failure after an inventory write must roll back the entire checkout.
await assert.rejects(s.createOrder(customer,[{id,quantity:-1}],crypto.randomUUID(),token));assert.equal((await s.allProducts()).find(p=>p.id===id).stock,4);
const session=crypto.randomBytes(32).toString('hex');await s.saveSession(s.hash(session),'credential-v1');assert.equal(await s.validSession(s.hash(session),'credential-v1'),true);assert.equal(await s.validSession(s.hash(session),'credential-v2'),false);await db.pool().query('UPDATE commerce.admin_sessions SET expires_at=now()-interval \'1 second\' WHERE hash=$1',[s.hash(session)]);assert.equal(await s.validSession(s.hash(session),'credential-v1'),false);await s.deleteSession(s.hash(session));assert.equal(await s.validSession(s.hash(session),'credential-v1'),false);
const bucket=crypto.randomUUID();await Promise.all([s.consumeLimit(bucket,2),s.consumeLimit(bucket,2)]);await assert.rejects(s.consumeLimit(bucket,2));await db.pool().query('DELETE FROM commerce.rate_limits WHERE key=$1',[bucket]);
await s.deleteProduct(id);const saved=await s.findOrder(references[0]);assert.equal(saved.items[0].price,12345);assert.notEqual(saved.tokenHash,token);
await db.pool().end();assert.equal((await s.findOrder(references[0])).reference,references[0],'persists across connection replacement');
console.log('PASS: PostgreSQL CRUD, concurrent idempotency/stock, rollback, private lookup, cancellation, snapshots, session rotation/revocation, shared throttling and hardened password.');
}finally{await db.pool().query('DELETE FROM commerce.orders WHERE reference=ANY($1::text[])',[references]);await s.deleteProduct(id);await db.pool().end();}})().catch(e=>{console.error(e.message);process.exitCode=1;}).finally(()=>fs.rmSync(temp,{recursive:true,force:true}));
