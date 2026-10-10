import 'server-only';
import {randomBytes} from 'node:crypto';
import {cookies} from 'next/headers';
import {hash,validSession,saveSession,deleteSession,consumeLimit} from './store';
import {checkPassword} from './password';
export const cookieName='anargya-admin';
export function configured(){return Boolean(process.env.ADMIN_PASSWORD_HASH?.startsWith('scrypt-v1:'));}
let hashing=false;
export async function verifyPassword(password:string){if(hashing)throw Error('Sign-in is busy. Please retry.');hashing=true;try{return await checkPassword(password,process.env.ADMIN_PASSWORD_HASH||'');}finally{hashing=false;}}
const version=()=>hash(process.env.ADMIN_PASSWORD_HASH||'');
export async function authenticated(){const token=(await cookies()).get(cookieName)?.value;if(!configured()||!token||!/^[a-f0-9]{64}$/.test(token))return false;return validSession(hash(token),version());}
export async function signIn(){const token=randomBytes(32).toString('hex');await saveSession(hash(token),version());return token;}
export async function signOut(){const token=(await cookies()).get(cookieName)?.value;if(token)await deleteSession(hash(token));}
export async function limit(request:Request,scope:string,max:number){
 // Vercel overwrites x-vercel-forwarded-for; do not trust caller-controlled x-forwarded-for.
 const ip=process.env.VERCEL ? request.headers.get('x-vercel-forwarded-for')?.split(',')[0]?.trim()||'unknown' : 'local';

 // Global scope also bounds distributed password hashing and order abuse.
 await consumeLimit(hash(scope+':global'),scope==='login'?50:300);
 await consumeLimit(hash(scope+':'+ip),max);
}
export function sameOrigin(request:Request){if(process.env.NODE_ENV==='production'&&!process.env.APP_ORIGIN)throw Error('APP_ORIGIN is not configured.');const origin=request.headers.get('origin');const expected=process.env.APP_ORIGIN||`${request.headers.get('x-forwarded-proto')==='https'?'https':new URL(request.url).protocol.slice(0,-1)}://${request.headers.get('host')||new URL(request.url).host}`;if(!origin||origin!==expected)throw Error('Request origin rejected.');}
export async function jsonBody(request:Request){
 if(!request.headers.get('content-type')?.includes('application/json'))throw Error('JSON request required.');
 const reader=request.body?.getReader();if(!reader)throw Error('JSON request required.');const chunks:Uint8Array[]=[];let size=0;
 try{while(true){const {done,value}=await reader.read();if(done)break;size+=value.byteLength;if(size>20000){await reader.cancel();throw Error('Request too large.');}chunks.push(value);}}finally{reader.releaseLock();}
 return JSON.parse(Buffer.concat(chunks).toString('utf8'));
}
export function reply(data:unknown,status=200){return Response.json(data,{status,headers:{'Cache-Control':'no-store'}});}

export function publicError(error:unknown,fallback:string){if(error&&typeof error==='object'&&'code' in error)return 'Commerce storage is temporarily unavailable.';return error instanceof Error?error.message:fallback;}
