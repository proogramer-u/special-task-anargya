import Image, { type StaticImageData } from "next/image";
import type { ReactNode } from "react";

export function ActionLink({ href, children, variant = "outline", className = "", external = false }: { href: string; children: ReactNode; variant?: "accent" | "outline" | "quiet"; className?: string; external?: boolean }) {
  return <a href={href} className={`button button--${variant} ${className}`} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{children}</a>;
}

export function SectionHeading({ eyebrow, title, summary, className = "" }: { eyebrow: string; title: ReactNode; summary: string; className?: string }) {
  return <div className={`section-heading flex flex-col gap-2 ${className}`}>
    <p className="eyebrow">{eyebrow}</p>
    <h2>{title}</h2>
    <p className="text-secondary">{summary}</p>
  </div>;
}

export function Photo({ image, alt, caption, className = "", contain = false, sizes = "(min-width: 1024px) 55vw, 100vw", priority = false }: { image: StaticImageData; alt: string; caption?: string; className?: string; contain?: boolean; sizes?: string; priority?: boolean }) {
  return <figure className={`photo flex min-w-0 flex-col gap-3 ${className}`}>
    <div className="photo-image relative">
      <Image src={image} alt={alt} fill sizes={sizes} className={contain ? "object-contain" : "object-cover"} preload={priority} />
    </div>
    {caption && <figcaption className="caption text-secondary">{caption}</figcaption>}
  </figure>;
}
