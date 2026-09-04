import { createDataFile } from "@akasha/utils-narrow/create-data-file"
import type { CompanionSkillTemplate } from "../companion-skill-activation-effect-types/companion-skill-activation-effect-types.module.code.ts"
import { COMPANION_SKILLS_00 } from "../companion-skills-00/companion-skills-00.module.code.ts"
import { COMPANION_SKILLS_01 } from "../companion-skills-01/companion-skills-01.module.code.ts"
import { COMPANION_SKILLS_02 } from "../companion-skills-02/companion-skills-02.module.code.ts"
import { COMPANION_SKILLS_03 } from "../companion-skills-03/companion-skills-03.module.code.ts"
import { COMPANION_SKILLS_04 } from "../companion-skills-04/companion-skills-04.module.code.ts"
import { COMPANION_SKILLS_05 } from "../companion-skills-05/companion-skills-05.module.code.ts"
import { COMPANION_SKILLS_06 } from "../companion-skills-06/companion-skills-06.module.code.ts"
import { COMPANION_SKILLS_07 } from "../companion-skills-07/companion-skills-07.module.code.ts"
import { COMPANION_SKILLS_08 } from "../companion-skills-08/companion-skills-08.module.code.ts"
import { COMPANION_SKILLS_09 } from "../companion-skills-09/companion-skills-09.module.code.ts"
import { COMPANION_SKILLS_10 } from "../companion-skills-10/companion-skills-10.module.code.ts"

const COMPANION_SKILLS_DATA = {
  ...COMPANION_SKILLS_00,
  ...COMPANION_SKILLS_01,
  ...COMPANION_SKILLS_02,
  ...COMPANION_SKILLS_03,
  ...COMPANION_SKILLS_04,
  ...COMPANION_SKILLS_05,
  ...COMPANION_SKILLS_06,
  ...COMPANION_SKILLS_07,
  ...COMPANION_SKILLS_08,
  ...COMPANION_SKILLS_09,
  ...COMPANION_SKILLS_10,
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
