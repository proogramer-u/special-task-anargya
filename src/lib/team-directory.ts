import roster from "@/data/team-members.json";

export const memberPlaceholder = "/images/team/member-placeholder.svg";
export const teamCategories = ["General Manager", "Mechanical", "Electrical", "Non-Technical"] as const;
export type TeamCategory = (typeof teamCategories)[number];
export type TeamAssignment = { id: string; mainDivision: TeamCategory; subdivision: string | null; role: string; sourceUrl: string; sourceOrder: number };
export type TeamMember = { id: string; fullName: string; mainDivision: TeamCategory; subdivision: string | null; role: string; imagePath: string; assignments: TeamAssignment[] };
export type DirectoryMember = Omit<TeamMember, "assignments"> & { assignmentId: string; sourceUrl: string };
export const teamMembers = roster as TeamMember[];
export const directoryMembers: DirectoryMember[] = teamMembers
  .flatMap(member => {
    const { assignments, ...identity } = member;
    return assignments.map(assignment => ({ ...identity, ...assignment, id: member.id, assignmentId: assignment.id }));
  })
  .sort((a, b) => a.sourceOrder - b.sourceOrder);
export function subdivisionsFor(category: TeamCategory) {
  return [...new Set(directoryMembers.filter(member => member.mainDivision === category).map(member => member.subdivision).filter((value): value is string => value !== null))];
}
export function divisionAnchor(value: string) { return `team-${value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-$/, "")}`; }
export const teamAdvisor = { id: "alief-wikarta", assignmentId: "advisor", fullName: "Alief Wikarta S.T., M.Sc., Ph.D.", mainDivision: "General Manager" as const, subdivision: null, role: "Team Advisor", imagePath: memberPlaceholder, sourceUrl: "https://www.anargyaits.com/team" };
