import Link from "next/link";
import { About, Hero, Team } from "@/components/home-sections";
import { Footer } from "@/components/home-sections";
import { ResearchPreview, SponsorsPreview, VehiclePreview } from "@/components/home-gateway";
import { TrackRecord } from "@/components/track-record";
export default function Home() {
  return <div id="top"><main id="main-content"><Hero/><About/><VehiclePreview/><ResearchPreview/><TrackRecord/><div className="mp-container mp-home-archive-link"><Link href="/achievements" className="mp-source">Explore the full competition archive →</Link></div><Team/><SponsorsPreview/></main><Footer/></div>;
}
