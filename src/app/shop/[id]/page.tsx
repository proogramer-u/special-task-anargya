import {notFound} from 'next/navigation';
import Image from 'next/image';
import {ShopShell} from '@/components/commerce/shop-shell';
import {ProductPurchase} from '@/components/commerce/shop-ui';
import {products} from '@/lib/commerce/store';
import {conceptSpecifications} from '@/lib/commerce/collection';
import {money} from '@/lib/commerce/model';
export const dynamic='force-dynamic';
export async function generateMetadata({params}:{params:Promise<{id:string}>}){const {id}=await params;const product=(await products()).find(p=>p.id===id);return {title:`${product?.name||'Product not found'} | Anargya Collection`};}
export default async function Detail({params}:{params:Promise<{id:string}>}){const {id}=await params;const p=(await products()).find(p=>p.id===id);if(!p)notFound();return <ShopShell title={p.name} summary="Original motorsport-inspired merchandise concept."><div className="shop-detail"><Image src={p.image} width={800} height={800} sizes="(max-width: 600px) 100vw, 50vw" alt={`${p.name} concept product mockup`} priority/><div><p>{p.category}</p><h2>{money(p.price)}</h2><p>{p.description}</p>{conceptSpecifications[p.id]&&<div className="shop-specifications"><h3>Concept specifications</h3><p>{conceptSpecifications[p.id]}</p><p className="shop-muted">Proposed materials and sizing, not a manufactured product specification.</p></div>}<ProductPurchase product={p}/></div></div></ShopShell>;}
