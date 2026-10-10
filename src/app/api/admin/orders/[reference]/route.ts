import {updateOrderStatus} from '@/lib/commerce/store';
import {statuses,type Order} from '@/lib/commerce/model';
import {authenticated,sameOrigin,jsonBody,reply,publicError} from '@/lib/commerce/auth';
export async function PATCH(request:Request,{params}:{params:Promise<{reference:string}>}){if(!await authenticated())return reply({error:'Unauthorized'},401);try{sameOrigin(request);const {reference}=await params;const body=await jsonBody(request);if(!statuses.includes(body.status))throw Error('Invalid status.');await updateOrderStatus(reference,body.status as Order['status']);return reply({ok:true});}catch(e){return reply({error:publicError(e,'Invalid status.')},400);}}
