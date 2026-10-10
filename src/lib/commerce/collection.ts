import type {Product} from "./model";
// Fictional concept products; no fulfilment or verified official retail offer.
export const collectionProducts:Product[]=[
  {
    "id": "racing-tee",
    "name": "Anargya Racing Tee",
    "category": "Apparel",
    "price": 185000,
    "stock": 32,
    "description": "A paddock staple with a restrained chest wordmark and green racing stripe. Cut for everyday wear, from workshop mornings to circuit weekends.",
    "image": "/images/shop/collection/racing-tee.webp",
    "active": true
  },
  {
    "id": "paddock-oversized-tee",
    "name": "Paddock Oversized Tee",
    "category": "Apparel",
    "price": 215000,
    "stock": 24,
    "description": "A relaxed silhouette built around a technical line graphic. Heavy jersey and dropped shoulders give the collection a quieter, more considered edge.",
    "image": "/images/shop/collection/paddock-oversized-tee.webp",
    "active": true
  },
  {
    "id": "circuit-club-cap",
    "name": "Circuit Club Cap",
    "category": "Accessories",
    "price": 125000,
    "stock": 30,
    "description": "Six panels, a curved brim and a discreet green accent. An understated finishing touch for time spent trackside.",
    "image": "/images/shop/collection/circuit-club-cap.webp",
    "active": true
  },
  {
    "id": "motorsport-lanyard",
    "name": "Motorsport Lanyard",
    "category": "Accessories",
    "price": 45000,
    "stock": 60,
    "description": "A technical stripe runs the length of this black paddock lanyard. A detachable clasp keeps the practical details simple.",
    "image": "/images/shop/collection/motorsport-lanyard.webp",
    "active": true
  },
  {
    "id": "racing-team-keychain",
    "name": "Racing Team Keychain",
    "category": "Accessories",
    "price": 55000,
    "stock": 45,
    "description": "A compact metal tag with a green edge and crisp racing typography. Designed as a small reminder of the workshop.",
    "image": "/images/shop/collection/racing-team-keychain.webp",
    "active": true
  },
  {
    "id": "workshop-canvas-tote",
    "name": "Workshop Canvas Tote",
    "category": "Accessories",
    "price": 115000,
    "stock": 28,
    "description": "An everyday carry with a generous opening and long shoulder handles. Natural canvas texture meets a minimal technical graphic.",
    "image": "/images/shop/collection/workshop-canvas-tote.webp",
    "active": true
  },
  {
    "id": "formula-ev-poster",
    "name": "Formula EV Poster",
    "category": "Prints",
    "price": 85000,
    "stock": 20,
    "description": "Electric formula geometry, reimagined as a graphic print. An original technical composition for a desk, workshop wall or study space.",
    "image": "/images/shop/collection/formula-ev-poster.webp",
    "active": true
  },
  {
    "id": "technical-grid-sticker-pack",
    "name": "Technical Grid Sticker Pack",
    "category": "Prints",
    "price": 35000,
    "stock": 70,
    "description": "Five small racing graphics drawn from grid lines, electric-vehicle geometry and green track markings. A compact collection of original motifs.",
    "image": "/images/shop/collection/technical-grid-sticker-pack.webp",
    "active": true
  },
  {
    "id": "trackside-hoodie",
    "name": "Trackside Hoodie",
    "category": "Apparel",
    "price": 395000,
    "stock": 18,
    "description": "A heavyweight layer for the late shift. Clean black fleece, a subtle chest mark and a green back graphic keep the focus on the silhouette.",
    "image": "/images/shop/collection/trackside-hoodie.webp",
    "active": true
  },
  {
    "id": "racing-heritage-shirt",
    "name": "Racing Heritage Shirt",
    "category": "Apparel",
    "price": 285000,
    "stock": 16,
    "description": "A short-sleeve workshop shirt with clean panels and precise green detailing. Racing cues, translated into a versatile everyday layer.",
    "image": "/images/shop/collection/racing-heritage-shirt.webp",
    "active": true
  }
];
export const conceptSpecifications:Record<string,string>={
  "racing-tee": "240 gsm cotton jersey; regular fit; ribbed crew neck.",
  "paddock-oversized-tee": "260 gsm cotton jersey; oversized fit; dropped shoulder.",
  "circuit-club-cap": "Cotton twill; adjustable metal buckle; embroidered graphic.",
  "motorsport-lanyard": "20 mm woven polyester; detachable clasp; metal swivel hook.",
  "racing-team-keychain": "Anodised aluminium concept; split ring; 65 \u00d7 25 mm tag.",
  "workshop-canvas-tote": "12 oz canvas; 38 \u00d7 42 cm; reinforced handles; unlined.",
  "formula-ev-poster": "A3, 297 \u00d7 420 mm; 200 gsm matte paper; unframed.",
  "technical-grid-sticker-pack": "Five vinyl sticker concepts; matte finish; assorted 40\u201380 mm sizes.",
  "trackside-hoodie": "320 gsm cotton-blend fleece; relaxed fit; kangaroo pocket.",
  "racing-heritage-shirt": "Cotton-poly twill; box fit; button front; chest pocket."
};
export const legacyProductIds=["demo-team-shirt", "demo-paddock-cap", "demo-workshop-tote", "demo-grid-print"];
export const productImages=[...collectionProducts.map(p=>p.image),...["/images/shop/shirt.svg", "/images/shop/cap.svg", "/images/shop/tote.svg", "/images/shop/print.svg"]];
