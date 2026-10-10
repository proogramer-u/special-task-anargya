import photo2025 from "../../public/images/anargya/timeline-2025-3.jpg";
import photo2024 from "../../public/images/anargya/timeline-2024-1.jpg";
import photo2023 from "../../public/images/anargya/timeline-2023-3.jpg";
export const competitionHistory = [
  { year: "2025", image: photo2025, alt: "Anargya members in the official 2025 timeline photograph", results: [{ event: "Formula SAE Japan", category: "Presentation EV", result: "2nd place" }], context: "The timeline also documents Go-Kart EV development for PLN ICE 2025; this project mention does not establish an award." },
  { year: "2024", image: photo2024, alt: "Anargya team in an official 2024 timeline photograph", results: [{ event: "Formula SAE Japan", category: "Presentation", result: "3rd place" }, { event: "Formula Bharat Pi-EV", category: "Triple Overall", result: "Third consecutive title" }], context: "Results are reported by the team. No general regional championship or unspecified overall international ranking is inferred." },
  { year: "2023", image: photo2023, alt: "Anargya members at the Formula SAE Japan 2023 event backdrop", results: [{ event: "Formula SAE Japan", category: "Presentation", result: "3rd place" }, { event: "Formula Bharat Pi-EV", category: "Triple Overall", result: "Second consecutive title" }], context: "The official timeline identifies this season as Anargya’s Formula SAE Japan debut." },
] as const;
