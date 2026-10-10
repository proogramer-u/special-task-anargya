import {ShopShell} from '@/components/commerce/shop-shell';
import {Catalog} from '@/components/commerce/shop-ui';
import {products} from '@/lib/commerce/store';
export const dynamic='force-dynamic';
export const metadata={title:'Collection | Anargya ITS EV Team'};
export default async function Shop(){return <ShopShell collection title="Made for the paddock." summary="Workshop essentials. Trackside layers. Original racing graphics. A concept collection inspired by the electric formula spirit of Anargya."><Catalog products={await products()}/></ShopShell>;}
