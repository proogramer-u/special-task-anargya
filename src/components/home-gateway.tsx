import Link from "next/link";
import { siteImages } from "@/lib/site-content";
import { ActionLink, Photo } from "./ui";
import "@/app/editorial.css";
export function VehiclePreview() {
  return <section id="vehicles" className="mp-home-vehicle mp-container"><div className="mp-home-preview-heading"><h2>Formula EV. Evolving through research.</h2><p>The Mark 6.0 programme continues Anargya’s electric formula development. Explore its context alongside Mark 5.0 specifications and Mark 4.0 history.</p></div><Photo image={siteImages.mark6} alt="Official Formula EV Mark 6.0 vehicle visualization" contain caption="Formula EV Mark 6.0 · Official visualization"/><ActionLink href="/vehicles">Explore the vehicles</ActionLink></section>;
}
export function ResearchPreview() {
  return <section id="research" className="mp-home-research"><div className="mp-container mp-home-editorial"><Photo image={siteImages.research} alt="Anargya team preparing a formula vehicle" caption="Official Anargya engineering gallery"/><div><h2>Engineering, one iteration at a time.</h2><p>Battery packaging, chassis, aerodynamics and vehicle dynamics are documented chapters of the team’s development work.</p><ActionLink href="/research">Explore the research</ActionLink></div></div></section>;
}
export function SponsorsPreview() {
  return <section id="sponsors" className="mp-container mp-home-support"><h2>Support behind the programme.</h2><div><p>Explore the complete source-qualified supporter wall and the team’s official partnership reports.</p><Link href="/sponsors" className="mp-source">Meet the supporters →</Link></div></section>;
}
