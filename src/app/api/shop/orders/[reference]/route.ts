import {findOrder,hash} from '@/lib/commerce/store';
import {reply} from '@/lib/commerce/auth';
export async function GET(request:Request,{params}:{params:Promise<{reference:string}>}){const {reference}=await params;const token=request.headers.get('x-order-token')||'';const order=await findOrder(reference,hash(token));if(!order)return reply({error:'Order not found.'},404);return reply({reference:order.reference,createdAt:order.createdAt,items:order.items,total:order.total,status:order.status});}
