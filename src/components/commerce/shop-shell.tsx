import Image from 'next/image';
import type {ReactNode} from 'react';
import {Footer} from '@/components/home-sections';
import {ShopLinks} from './shop-ui';
import '@/app/commerce.css';
export function ShopShell({title,summary,children,collection=false}:{title:string;summary:string;children:ReactNode;collection?:boolean}){return <div className="mp-page"><main id="main-content" className="shop-page"><div className="site-container"><ShopLinks/><header className={collection?"shop-intro shop-intro--collection":"shop-intro"}><div className="shop-intro-copy"><h1>{title}</h1><p>{summary}</p><p className="shop-disclosure">Concept merchandise collection · Orders are simulated and no purchases are processed.</p>{collection&&<a href="#collection" className="button button--accent">Explore the collection</a>}</div>{collection&&<div className="shop-hero-image"><Image src="/images/shop/collection/racing-tee.webp" width={800} height={800} alt="Black Anargya Racing Tee concept with green racing graphics" sizes="(max-width: 700px) 100vw, 50vw" priority/><span>Racing Tee / Collection concept</span></div>}</header>{children}</div></main><Footer/></div>;}
