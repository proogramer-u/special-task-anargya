import { Navigation } from "@/components/navigation";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const inter = localFont({ src: "../../public/fonts/inter-variable.ttf", variable: "--font-inter", weight: "100 900", display: "swap" });

export const metadata: Metadata = {
  title: "Anargya ITS — Formula EV Research Team",
  description: "Discover Anargya ITS EV Team: student-led electric formula research, vehicle development, team-reported achievements and programme supporters at Institut Teknologi Sepuluh Nopember.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en" className={`${inter.variable} antialiased`}><body><a href="#main-content" className="skip-link">Skip to content</a><Navigation/>{children}</body></html>;
}
