"use client";
import Image from "next/image";
import { useState } from "react";
import { memberPlaceholder, type DirectoryMember } from "@/lib/team-directory";
import styles from "@/app/team/team-styles";

export function TeamMemberCard({ member, headingLevel = "h5" }: { member: DirectoryMember; headingLevel?: "h4" | "h5" }) {
  const Heading = headingLevel;
  const [failedPath, setFailedPath] = useState<string | null>(null);
  const [placeholderFailed, setPlaceholderFailed] = useState(false);
  const requestedPath = member.imagePath || memberPlaceholder;
  const source = failedPath === requestedPath ? memberPlaceholder : requestedPath;
  return <article className={styles.memberCard} data-member-card data-member-id={member.id}>
    <div className={styles.portrait}>
      {placeholderFailed && source === memberPlaceholder ? <svg aria-hidden="true" viewBox="0 0 320 460"><rect width="320" height="460" fill="#121212"/><circle cx="160" cy="166" r="57" fill="#555"/><path d="M47 381c0-76 44-127 113-127s113 51 113 127v79H47z" fill="#555"/><path d="M24 435h272" stroke="#29D970" strokeWidth="2"/></svg> : <Image src={source} alt={source === memberPlaceholder ? "" : `Portrait of ${member.fullName}`} width={320} height={460} loading="eager" sizes="(max-width: 600px) 45vw, (max-width: 1000px) 30vw, 25vw" onError={() => source === memberPlaceholder ? setPlaceholderFailed(true) : setFailedPath(requestedPath)} />}
      {source === memberPlaceholder && <span className={styles.portraitLabel}>Portrait pending</span>}
    </div>
    <div className={styles.memberCopy}><p className={styles.memberRole}>{member.role}</p><Heading>{member.fullName}</Heading>{member.subdivision && <p className={styles.memberSubdivision}>{member.subdivision}</p>}</div>
  </article>;
}
