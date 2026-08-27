import { createDataFile } from "@shared/utils-narrow/create-data-file"
import { companionSkillsFromPages } from "../generated/temper-companion-skill.generated"
import type { CompanionSkillTemplate } from "./companion-skill-activation-effect-types"

const COMPANION_SKILLS_DATA = {
  ...companionSkillsFromPages.data,
} satisfies Record<string, CompanionSkillTemplate>

export const companionSkills = createDataFile<CompanionSkillTemplate>()(COMPANION_SKILLS_DATA)

export type CompanionSkillId = (typeof companionSkills.ids)[number]

export function getAllSkillsForCompanion(companionId: string) {
  return companionSkills.list.filter(
    (skill) => skill.companionId === companionId || skill.companionId === "all"
  )
}

export function getDefaultUltimateForCompanion(companionId: string): CompanionSkillId {
  if (companionId === "no-companion") {
    return "no-skill"
  }
  return (
    companionSkills.ids.find((id) => {
      const skill = companionSkills.data[id]
      return (
        (skill.companionId === companionId || skill.companionId === "all") &&
        skill.skillType === "ultimate"
      )
    }) ?? "no-skill"
  )
}

export function isSkillValidForCompanion(skillId: CompanionSkillId, companionId: string): boolean {
  if (skillId === "no-skill") {
    return true
  }
  const skill = companionSkills.data[skillId]
  return skill.companionId === "all" || skill.companionId === companionId
}
