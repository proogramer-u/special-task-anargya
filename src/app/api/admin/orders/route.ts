import {allOrders} from '@/lib/commerce/store';
import {authenticated,reply} from '@/lib/commerce/auth';
export async function GET(){if(!await authenticated())return reply({error:'Unauthorized'},401);return reply(await allOrders());}
