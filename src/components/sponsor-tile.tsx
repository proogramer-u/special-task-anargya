"use client";

import Image from "next/image";
import { useState } from "react";
import type { sponsors } from "@/lib/sponsors";

export function SponsorTile({ sponsor }: { sponsor: (typeof sponsors)[number] }) {
  const [failed, setFailed] = useState(false);
  return <li className="sponsor-tile flex min-w-0 flex-col items-center justify-center gap-2" data-long-label={sponsor.name === "PT RAN Andalan Indonesia" || undefined} title={sponsor.programme ? undefined : "Additional official-site supporter listing"}>
    <div className={`logo-well ${!failed && sponsor.light ? "logo-well--light" : ""}`}>
      <div className="logo-image relative">
        {failed || !sponsor.image?.src ? <span className="logo-fallback">{sponsor.name}</span> : <Image src={sponsor.image} alt={sponsor.name + " logo"} fill sizes="(min-width: 1024px) 200px, (min-width: 640px) 180px, 140px" className="object-contain" onError={() => setFailed(true)} />}
      </div>
    </div>
    <p className="caption text-secondary text-center">{sponsor.name}</p>
  </li>;
}
