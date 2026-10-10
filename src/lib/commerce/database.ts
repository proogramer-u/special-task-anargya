import 'server-only';
import { Pool, type PoolClient } from 'pg';
const state = globalThis as typeof globalThis & { commercePool?: Pool };
export function pool() {
  if (!state.commercePool || state.commercePool.ended) {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) throw Error('Commerce database is not configured. Set DATABASE_URL and apply migrations.');
    const url = new URL(connectionString);
    const local = ['localhost','127.0.0.1','::1','[::1]'].includes(url.hostname);
    // Do not let URL sslmode override verified TLS settings.
    for (const key of ['sslmode','sslcert','sslkey','sslrootcert']) url.searchParams.delete(key);
    state.commercePool = new Pool({ connectionString:url.toString(), max:3,
      connectionTimeoutMillis:10000,idleTimeoutMillis:10000,allowExitOnIdle:true,
      ssl:local ? false : {rejectUnauthorized:true,...(process.env.DATABASE_SSL_CA ? {ca:process.env.DATABASE_SSL_CA.replace(/\\n/g,'\n')} : {})},
      statement_timeout:15000,query_timeout:20000 });
    // Never log connection errors containing credentials/customer SQL parameters.
    state.commercePool.on('error',()=>console.error('Commerce database idle connection failed.'));
  }
  return state.commercePool;
}
export async function sqlTransaction<T>(fn:(client:PoolClient)=>Promise<T>) {
  const client=await pool().connect();
  try { await client.query('BEGIN'); const value=await fn(client);await client.query('COMMIT');return value; }
  catch(error){await client.query('ROLLBACK');throw error;}
  finally{client.release();}
}

export async function closePool(){if(state.commercePool&&!state.commercePool.ended)await state.commercePool.end();}
