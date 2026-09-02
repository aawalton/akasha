import type { companionSkillLines } from "@akasha/temper-companions-core/skill-lines-by-companion"


export interface CompanionSkillLineTemplate {
  id: string
  name: string
  companionId: string
  category: "class" | "weapon" | "guild" | "armor"
}

export type CompanionSkillLineId = (typeof companionSkillLines.ids)[number]
