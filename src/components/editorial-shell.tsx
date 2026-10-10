import type { ReactNode } from "react";
import { Footer } from "./home-sections";
import "@/app/editorial.css";

export function EditorialShell({ children }: { children: ReactNode }) {
  return <div className="mp-page"><main id="main-content">{children}</main><Footer/></div>;
}
export function SourceLink({ href, children = "Official source" }: { href: string; children?: ReactNode }) {
  return <a href={href} target="_blank" rel="noopener noreferrer" className="mp-source">{children} ↗</a>;
}
