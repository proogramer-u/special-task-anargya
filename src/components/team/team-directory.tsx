"use client";
import { useEffect, useRef, useState } from "react";
import { directoryMembers, divisionAnchor, subdivisionsFor, teamCategories } from "@/lib/team-directory";
import { TeamMemberCard } from "./team-member-card";
import styles from "@/app/team/team-styles";

export function TeamDirectory() {
  const [selected, setSelected] = useState(0);
  const [activeSubdivision, setActiveSubdivision] = useState("");
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  useEffect(() => {
    let revealFrame = 0;
    const syncHash = () => {
      const anchor = window.location.hash.slice(1);
      const categoryIndex = teamCategories.findIndex((category, index) =>
        anchor === `panel-${index}` || anchor === divisionAnchor(category) ||
        subdivisionsFor(category).some(name => divisionAnchor(name) === anchor));
      if (categoryIndex < 0) return;
      setSelected(categoryIndex);
      const subdivision = subdivisionsFor(teamCategories[categoryIndex]).find(name => divisionAnchor(name) === anchor);
      setActiveSubdivision(subdivision ?? "");
      if (anchor.startsWith("team-")) {
        cancelAnimationFrame(revealFrame);
        revealFrame = requestAnimationFrame(() => document.getElementById(anchor)?.scrollIntoView({ block: "start" }));
      }
    };
    const initialFrame = requestAnimationFrame(syncHash);
    window.addEventListener("hashchange", syncHash);
    window.addEventListener("popstate", syncHash);
    return () => {
      cancelAnimationFrame(initialFrame);
      cancelAnimationFrame(revealFrame);
      window.removeEventListener("hashchange", syncHash);
      window.removeEventListener("popstate", syncHash);
    };
  }, []);
  useEffect(() => {
    const names = subdivisionsFor(teamCategories[selected]);
    const observer = new IntersectionObserver(entries => {
      const current = entries.find(entry => entry.isIntersecting);
      if (current) setActiveSubdivision(names.find(name => divisionAnchor(name) === current.target.id) ?? "");
    }, { rootMargin: "-10% 0px -65% 0px", threshold: 0 });
    names.forEach(name => { const section = document.getElementById(divisionAnchor(name)); if (section) observer.observe(section); });
    return () => observer.disconnect();
  }, [selected]);
  function select(index: number, focus = false) { setSelected(index); setActiveSubdivision(""); history.pushState(null, "", `#panel-${index}`); window.dispatchEvent(new Event("hashchange")); if (focus) tabs.current[index]?.focus(); }
  return <section id="team-directory" className={`${styles.section} ${styles.directory}`} aria-labelledby="directory-heading">
    <div className={styles.container}><div className={styles.sectionIntro}><h2 id="directory-heading">Meet the team.</h2><p>Explore the leadership and subdivisions of Anargya’s published eighth-generation team. Every role below follows the official Team page.</p></div>
      <div className={styles.tabs} role="tablist" aria-label="Team categories">
        {teamCategories.map((category, index) => <button key={category} ref={node => { tabs.current[index] = node; }} id={`category-${index}`} role="tab" aria-selected={selected === index} aria-controls={`panel-${index}`} tabIndex={selected === index ? 0 : -1} onClick={() => select(index)} onKeyDown={event => { const next = event.key === "ArrowRight" ? (index + 1) % 4 : event.key === "ArrowLeft" ? (index + 3) % 4 : event.key === "Home" ? 0 : event.key === "End" ? 3 : null; if (next !== null) { event.preventDefault(); select(next, true); } }}>{category}</button>)}
      </div>
      {teamCategories.map((category, index) => {
        const members = directoryMembers.filter(member => member.mainDivision === category);
        const subdivisions = subdivisionsFor(category);
        return <div key={category} id={`panel-${index}`} role="tabpanel" aria-labelledby={`category-${index}`} hidden={selected !== index} tabIndex={0} className={styles.panel}>
          {subdivisions.length > 0 && <nav className={styles.subdivisionNav} aria-label={`${category} subdivisions`}><p>Subdivisions</p>{subdivisions.map(name => <a key={name} href={`#${divisionAnchor(name)}`} aria-current={activeSubdivision === name ? "location" : undefined} onClick={() => setActiveSubdivision(name)}>{name}<span aria-hidden="true">↗</span></a>)}</nav>}
          <div className={styles.directoryContent}>{(subdivisions.length ? subdivisions : [null]).map(subdivision => {
            const group = members.filter(member => member.subdivision === subdivision);
            const heads = group.filter(member => !member.role.startsWith("STAFF"));
            const staff = group.filter(member => member.role.startsWith("STAFF"));
            return <section key={subdivision ?? category} id={divisionAnchor(subdivision ?? category)} className={styles.memberSection} aria-labelledby={`${divisionAnchor(subdivision ?? category)}-heading`}><h3 id={`${divisionAnchor(subdivision ?? category)}-heading`}>{subdivision ?? "General Managers"}</h3>{heads.length > 0 && <div className={styles.roleGroup}><h4>{subdivision ? "Heads of Division" : "Management"}</h4><div className={styles.cardGrid}>{heads.map(member => <TeamMemberCard member={member} key={member.assignmentId}/>)}</div></div>}{staff.length > 0 && <div className={styles.roleGroup}><h4>Staff</h4><div className={styles.cardGrid}>{staff.map(member => <TeamMemberCard member={member} key={member.assignmentId}/>)}</div></div>}</section>;
          })}</div>
        </div>;
      })}
      <p className={styles.sourceNote}>64 unique members · 65 published role placements. One member holds two listed roles. <a href="https://www.anargyaits.com/team" target="_blank" rel="noopener noreferrer">Official eighth-generation directory ↗</a></p>
    </div>
  </section>;
}
