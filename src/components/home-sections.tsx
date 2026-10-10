import Image from "next/image";
import { navigation, researchTopics, siteImages, socials, teamAddress, teamEmail } from "@/lib/site-content";
import { sponsors } from "@/lib/sponsors";
import { ActionLink, Photo, SectionHeading } from "./ui";
import { SponsorTile } from "./sponsor-tile";

export function Hero() {
  return <section id="hero" className="hero">
    <div className="hero-backdrop" aria-hidden="true">
      <Image src={siteImages.hero} alt="" fill sizes="100vw" className="object-cover" preload />
      <div className="hero-shade" />
    </div>
    <div className="hero-copy site-container">
      <div className="hero-intro flex flex-col gap-4">
        <p className="eyebrow">ITS FORMULA EV TEAM</p>
        <h1>ANARGYA ITS</h1>
        <p className="hero-strip">EV RESEARCH TEAM</p>
        <p className="hero-summary">Electric formula and autonomous-vehicle research from Institut Teknologi Sepuluh Nopember.</p>
        <div className="hero-actions flex gap-4">
          <ActionLink href="/vehicles" variant="accent">Explore our vehicles</ActionLink>
          <ActionLink href="#about" variant="quiet" className="hero-about">About Anargya</ActionLink>
        </div>
      </div>
    </div>
    <div className="hero-narrow-photo relative">
      <Image src={siteImages.hero} alt="Anargya electric formula vehicle during night testing" fill sizes="100vw" className="object-cover" preload />
    </div>
    <div className="hero-context site-container">
      <p className="eyebrow">#AlwaysEnergized</p>
      <p className="caption">FORMULA EV TESTING / ANARGYA ITS</p>
    </div>
  </section>;
}

export function About() {
  return <section id="about" className="section">
    <div className="site-container">
      <div className="about-copy flex flex-col">
        <SectionHeading eyebrow="ABOUT ANARGYA" title={<>Electric formula<span className="desktop-line" /> research at ITS</>} summary="Founded in September 2018, Anargya is a student-led research team at Institut Teknologi Sepuluh Nopember. We develop electric formula vehicles and research autonomous-vehicle technology." />
        <ActionLink href="/team#our-story">Learn our history</ActionLink>
        <dl className="identity-facts grid grid-cols-2 gap-8">
          <div className="identity-stat flex flex-col gap-4"><dt>2018</dt><dd>Founded in September</dd></div>
          <div className="identity-stat flex flex-col gap-4"><dt>ITS</dt><dd>Institut Teknologi Sepuluh Nopember</dd></div>
        </dl>
      </div>
    </div>
  </section>;
}

export function Research() {
  return <section id="research" className="research">
    <div className="research-feature">
      <div className="research-backdrop" aria-hidden="true"><Image src={siteImages.research} alt="" fill sizes="100vw" className="object-cover" /><div className="research-shade" /></div>
      <div className="site-container research-content">
        <SectionHeading eyebrow="RESEARCH & DEVELOPMENT" title={<>Research in motion.<span className="desktop-line" /> Engineering in practice.</>} summary="Battery-pack architecture, lightweight chassis, aerodynamics, telemetry and vehicle dynamics inform our electric-vehicle development work." />
        <Photo image={siteImages.research} alt="Anargya members preparing an electric formula vehicle" className="research-narrow-photo" />
        <p>From vehicle preparation to testing, each project connects student research with practical engineering.</p>
        <ActionLink href="/vehicles">Explore our projects</ActionLink>
      </div>
    </div>
    <div className="site-container research-topics">
      {researchTopics.map(topic => <article key={topic.title} className="research-topic flex flex-col gap-4">
        <h3>{topic.title}</h3><p className="text-secondary">{topic.summary}</p><p className="caption text-accent">{topic.source}</p>
      </article>)}
    </div>
  </section>;
}

function Specifications() {
  const values = [["Weight", "220 kg"], ["Power", "80 kW"], ["Battery", "6.9 kWh"], ["Top speed", "120 km/h"]];
  return <div className="specifications flex flex-col gap-4">
    <h4>Specification</h4>
    <dl className="flex flex-col gap-4">{values.map(([label, value]) => <div key={label} className="grid grid-cols-2 gap-4"><dt className="text-secondary">{label}</dt><dd>{value}</dd></div>)}</dl>
    <p className="caption text-secondary">Published by Anargya ITS</p>
  </div>;
}

export function Vehicles() {
  return <section id="vehicles" className="section">
    <div className="site-container vehicles-content flex flex-col">
      <SectionHeading eyebrow="VEHICLES & PROJECTS" title={<>Formula EV.<span className="desktop-line" /> Anargya engineering.</>} summary="Explore the team’s electric formula development—from published Mark 5.0 specifications to the Mark 6.0 programme." />
      <article className="vehicle-row vehicle-row--mark6">
        <div className="vehicle-copy flex flex-col gap-4">
          <p className="vehicle-tag">Formula EV</p>
          <p className="eyebrow vehicle-mobile-label">FORMULA EV / MARK 6.0</p>
          <h3>Mark 6.0</h3>
          <p className="text-secondary">Developed for Anargya’s Formula SAE Japan 2026 programme.</p>
          <p className="small text-secondary"></p>
          <ActionLink href="#research">Explore our research</ActionLink>
        </div>
        <Photo image={siteImages.mark6} alt="Official Formula EV Mark 6.0 vehicle visualization" contain caption="Formula EV Mark 6.0" className="vehicle-photo" />
      </article>
      <hr className="vehicle-divider" />
      <article className="vehicle-row vehicle-row--mark5">
        <Photo image={siteImages.mark5} alt="Official Formula EV Mark 5.0 vehicle visualization" contain caption="Formula EV Mark 5.0 / Official vehicle visualization" className="vehicle-photo" />
        <div className="vehicle-copy flex flex-col gap-4">
          <p className="eyebrow">FORMULA EV / MARK 5.0</p><h3>Mark 5.0</h3>
          <p className="text-secondary">The 2024 development programme brought refinements in aerodynamics, telemetry and vehicle dynamics.</p>
          <Specifications />
        </div>
      </article>
    </div>
  </section>;
}

export function Team() {
  return <section id="team" className="section">
    <div className="site-container team-row">
      <div className="team-copy flex flex-col gap-8">
        <SectionHeading eyebrow="THE TEAM" title={<>Meet the people<span className="desktop-line" /> behind the vehicles.</>} summary="A student-led research team bringing engineering ideas into electric-vehicle development and international competition." />
        <div className="team-desktop-actions flex flex-col gap-8"><ActionLink href="/team">Meet the team</ActionLink><p className="eyebrow">#AlwaysEnergized</p></div>
      </div>
      <Photo image={siteImages.team} alt="Anargya team and electric formula vehicle at Formula SAE Japan" caption="Anargya at Formula SAE Japan" className="team-photo" />
      <div className="team-narrow-actions flex flex-col gap-8"><ActionLink href="/team">Meet the team</ActionLink><p className="eyebrow">#AlwaysEnergized</p></div>
    </div>
  </section>;
}

export function Sponsors() {
  return <section id="sponsors" className="section">
    <div className="site-container sponsor-content flex flex-col">
      <SectionHeading eyebrow="SPONSORS & PARTNERS" title="Thank you for supporting Anargya." summary="Reported 2026 programme supporters and additional official-site listings." className="sponsor-intro" />
      <div className="sponsor-group flex flex-col gap-4">
        <ul className="sponsor-grid" aria-label="Reported programme supporters and additional official-site listings">{sponsors.filter(sponsor => sponsor.name.trim()).map(sponsor => <SponsorTile key={sponsor.name} sponsor={sponsor} />)}</ul>
      </div>
    </div>
  </section>;
}

export function Contact() {
  return <section id="contact" className="section contact">
    <div className="site-container contact-row">
      <SectionHeading eyebrow="CONTACT ANARGYA" title={<>Sponsorship &amp;<span className="desktop-line" /> collaboration.</>} summary="Get in touch with the team to discuss sponsorship and collaboration opportunities." />
      <div className="contact-details flex flex-col gap-4">
        <p className="eyebrow">ANARGYA ITS EV TEAM</p>
        <a className="contact-email" href={`mailto:${teamEmail}`}>{teamEmail}</a>
        <p className="text-secondary">Institut Teknologi Sepuluh Nopember<br />Surabaya, Indonesia</p>
        <ActionLink href={`mailto:${teamEmail}`} variant="accent">Email the team</ActionLink>
      </div>
    </div>
  </section>;
}

export function Footer() {
  return <footer className="site-footer">
    <div className="site-container flex flex-col gap-8">
      <div className="footer-main">
        <div className="footer-identity flex flex-col gap-3">
          <div className="footer-logo relative"><Image src={siteImages.identity} alt="Anargya ITS" fill sizes="320px" className="object-contain" /></div>
          <p className="footer-team-name">Anargya ITS Formula EV Team</p>
          <address className="small text-secondary not-italic"><a href={`mailto:${teamEmail}`}>{teamEmail}</a><br />{teamAddress}</address>
        </div>
        <nav aria-label="Footer navigation" className="footer-links flex flex-col gap-2">
          {navigation.map(link => <a className="nav-link" key={link.href} href={link.href}>{link.label}</a>)}<a className="nav-link" href="/sponsors#contact">Contact us</a>
        </nav>
      </div>
      <hr />
      <div className="footer-bottom">
        <p className="caption text-secondary">© 2026 Anargya ITS EV Team</p>
        <div className="social-links">{socials.map(social => <a key={social.label} className="nav-link" href={social.href} target="_blank" rel="noopener noreferrer">{social.label}</a>)}</div>
      </div>
    </div>
  </footer>;
}
