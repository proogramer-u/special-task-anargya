/* eslint-disable @typescript-eslint/no-require-imports -- Node maintenance CLI. */
require('@next/env').loadEnvConfig(process.cwd());
const fs=require('node:fs');const crypto=require('node:crypto');
if(process.env.MIGRATION_DATABASE_URL)process.env.DATABASE_URL=process.env.MIGRATION_DATABASE_URL;
const modules=require('./load-commerce.cjs')();const db=modules.load('database');
(async()=>{await db.sqlTransaction(async c=>{
 await c.query("SELECT pg_advisory_xact_lock(hashtextextended('commerce-migrations',0))");
 await c.query('CREATE SCHEMA IF NOT EXISTS commerce');await c.query('REVOKE ALL ON SCHEMA commerce FROM PUBLIC');
 await c.query('CREATE TABLE IF NOT EXISTS commerce.schema_migrations(version text PRIMARY KEY,checksum text NOT NULL,applied_at timestamptz NOT NULL DEFAULT now())');
 for(const file of fs.readdirSync('supabase/migrations').filter(f=>f.endsWith('.sql')).sort()){
 const sql=fs.readFileSync('supabase/migrations/'+file,'utf8');const checksum=crypto.createHash('sha256').update(sql).digest('hex');const old=(await c.query('SELECT checksum FROM commerce.schema_migrations WHERE version=$1',[file])).rows[0];
 if(old){if(old.checksum!==checksum)throw Error('Applied migration changed: '+file);console.log('Already applied:',file);continue;}
 await c.query(sql);await c.query('INSERT INTO commerce.schema_migrations(version,checksum) VALUES($1,$2)',[file,checksum]);console.log('Applied:',file);
 }
});})().catch(()=>{console.error('Migration failed; transaction rolled back. Check connection, permissions and immutable migration checksums.');process.exitCode=1;}).finally(async()=>{await db.closePool();modules.cleanup();});
