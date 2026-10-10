import {randomUUID} from 'node:crypto';
import {allProducts,addProduct} from '@/lib/commerce/store';
import {validateProduct} from '@/lib/commerce/model';
import {authenticated,sameOrigin,jsonBody,reply,publicError} from '@/lib/commerce/auth';
export async function GET(){if(!await authenticated())return reply({error:'Unauthorized'},401);return reply(await allProducts());}
export async function POST(request:Request){if(!await authenticated())return reply({error:'Unauthorized'},401);try{sameOrigin(request);const product={...validateProduct(await jsonBody(request)),id:randomUUID()};await addProduct(product);return reply(product,201);}catch(e){return reply({error:publicError(e,'Invalid product.')},400);}}
