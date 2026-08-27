import type { companionSkillLines } from "../generated/temper-companion-skill-line.generated"


export interface CompanionSkillLineTemplate {
  id: string
  name: string
  companionId: string
  category: "class" | "weapon" | "guild" | "armor"
}

export type CompanionSkillLineId = (typeof companionSkillLines.ids)[number]
