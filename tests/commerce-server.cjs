/* eslint-disable @typescript-eslint/no-require-imports -- Isolated production-server integration. */
const {spawn}=require('node:child_process');const crypto=require('node:crypto');
if(!process.env.TEST_DATABASE_URL){console.error('BLOCKED: TEST_DATABASE_URL must be an isolated migrated database.');process.exit(2);}
process.env.DATABASE_URL=process.env.TEST_DATABASE_URL;
const modules=require('../scripts/load-commerce.cjs')();let server;
(async()=>{
 const password=crypto.randomBytes(24).toString('hex');const encoded=await modules.load('password').hashPassword(password);const base='http://127.0.0.1:3004';
 const env={...process.env,DATABASE_URL:process.env.TEST_DATABASE_URL,ADMIN_PASSWORD_HASH:encoded,APP_ORIGIN:base,TEST_ADMIN_PASSWORD:password,BASE_URL:base,NODE_ENV:'production'};
 server=spawn(process.execPath,['node_modules/next/dist/bin/next','start','--port','3004'],{env,stdio:['ignore','ignore','pipe']});let errors='';server.stderr.on('data',d=>{errors+=d.toString();});
 let ready=false;for(let i=0;i<100;i++){if(server.exitCode!==null)throw Error('Test server exited before readiness.');try{if((await fetch(base)).ok){ready=true;break;}}catch{}await new Promise(r=>setTimeout(r,200));}if(!ready)throw Error('Test server did not become ready.');
 const child=spawn(process.execPath,['tests/commerce-api.cjs'],{env,stdio:'inherit'});await new Promise((resolve,reject)=>{child.on('error',reject);child.on('exit',code=>code===0?resolve():reject(Error('API integration failed.')));});
 if(errors.includes('Error:'))throw Error('Test server logged an error; inspect database and runtime configuration.');
})().catch(e=>{console.error(e.message);process.exitCode=1;}).finally(async()=>{if(server&&server.exitCode===null){server.kill();await new Promise(r=>server.on('exit',r));}const db=modules.load('database');try{await db.pool().query("DELETE FROM commerce.orders WHERE customer->>'email'='qa@example.invalid'");}finally{await db.closePool();modules.cleanup();}});
