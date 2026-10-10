import hero from "../../public/images/anargya/anr-testing.png";
import research from "../../public/images/anargya/fsae-j-4.jpg";
import mark6 from "../../public/images/anargya/mk6-side-left.png";
import mark5 from "../../public/images/anargya/mark5.png";
import team from "../../public/images/anargya/fsae-j-2.png";
import logo from "../../public/images/anargya/logo-polos.png";
import identity from "../../public/images/anargya/logo-anargya-inline.png";
import achievement2025 from "../../public/images/anargya/timeline-2025-3.jpg";
import achievement2024 from "../../public/images/anargya/timeline-2024-1.jpg";
import achievement2023 from "../../public/images/anargya/timeline-2023-3.jpg";

export const siteImages = { hero, research, mark6, mark5, team, logo, identity };
export const officialSite = "https://www.anargyaits.com";
export const teamEmail = "anargya@its.ac.id";
export const teamAddress = "Jl. Teknik Sipil No. 2, Keputih, Sukolilo, Surabaya, Jawa Timur 60111";
export const navigation = [
  { label: "Team", href: "/team" },
  { label: "Vehicles", href: "/vehicles" },
  { label: "Achievements", href: "/achievements" },
  { label: "Research", href: "/research" },
  { label: "Sponsors", href: "/sponsors" },
] as const;

export const researchTopics = [
  { title: "Battery & chassis", summary: "Battery-pack architecture and lightweight chassis development for Mark 4.0.", source: "2023 development programme" },
  { title: "Aerodynamics", summary: "Aerodynamic refinements in the development of Formula EV Mark 5.0.", source: "2024 development programme" },
  { title: "Telemetry & dynamics", summary: "Telemetry systems and vehicle-dynamics refinements for Mark 5.0.", source: "2024 development programme" },
] as const;

// Team-reported results from the official About timeline; no overall-rank inference.
export const achievements = [
  { year: "2025", category: "PRESENTATION EV", placement: "2nd place", competition: "Formula SAE Japan", detail: "Presentation EV", image: achievement2025, alt: "Anargya team members presenting in an official 2025 timeline photograph", caption: "Official Anargya timeline / 2025" },
  { year: "2022–2024", category: "PI-EV", placement: "3 consecutive titles", competition: "Formula Bharat Pi-EV", detail: "Triple Overall", image: achievement2024, alt: "Anargya team together in an official 2024 timeline photograph", caption: "Official Anargya timeline / 2024" },
  { year: "2023", category: "PRESENTATION", placement: "3rd place", competition: "Formula SAE Japan", detail: "Presentation", image: achievement2023, alt: "Anargya team in front of the Formula SAE Japan 2023 event backdrop", caption: "Formula SAE Japan / official 2023 timeline" },
] as const;
export type Achievement = (typeof achievements)[number];

export const socials = [
  { label: "Instagram", href: "https://instagram.com/anargya.its" },
  { label: "Facebook", href: "https://facebook.com/anargya.its" },
  { label: "YouTube", href: "https://www.youtube.com/@anargyaitsteam1003" },
] as const;
