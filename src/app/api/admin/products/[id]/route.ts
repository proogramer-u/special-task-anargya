import {updateProduct,deleteProduct} from '@/lib/commerce/store';
import {validateProduct} from '@/lib/commerce/model';
import {authenticated,sameOrigin,jsonBody,reply,publicError} from '@/lib/commerce/auth';
export async function PUT(request:Request,{params}:{params:Promise<{id:string}>}){if(!await authenticated())return reply({error:'Unauthorized'},401);try{sameOrigin(request);const {id}=await params;const update=validateProduct(await jsonBody(request));const product=await updateProduct(id,update);return reply(product);}catch(e){return reply({error:publicError(e,'Invalid product.')},400);}}
export async function DELETE(request:Request,{params}:{params:Promise<{id:string}>}){if(!await authenticated())return reply({error:'Unauthorized'},401);try{sameOrigin(request);const {id}=await params;await deleteProduct(id);return reply({ok:true});}catch{return reply({error:'Request rejected.'},400);}}
