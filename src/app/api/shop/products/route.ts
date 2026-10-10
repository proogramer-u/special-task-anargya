import {products} from '@/lib/commerce/store';
import {reply} from '@/lib/commerce/auth';
export const dynamic='force-dynamic';
export async function GET(){return reply(await products());}
