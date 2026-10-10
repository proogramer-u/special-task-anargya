import {createOrder} from '@/lib/commerce/store';
import {validateCheckout} from '@/lib/commerce/model';
import {sameOrigin,jsonBody,reply,limit,publicError} from '@/lib/commerce/auth';
export async function POST(request:Request){try{sameOrigin(request);await limit(request,'checkout',30);const body=await jsonBody(request);const token=request.headers.get('x-order-token');if(!token||!/^[a-f0-9]{64}$/.test(token))throw Error('Invalid order access token.');const {customer,items,idempotency}=validateCheckout(body);const order=await createOrder(customer,items,idempotency,token);return reply({reference:order.reference},201);}catch(error){return reply({error:publicError(error,'Order failed.')},400);}}
