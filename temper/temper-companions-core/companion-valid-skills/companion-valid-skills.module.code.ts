import { assertNever } from "@akasha/utils-narrow/assert-never"
import { getArmorWeightForBaseRoles } from "../companion-base-roles/companion-base-roles.module.code.ts"
import {
  type CompanionSkillId,
  companionSkills,
} from "../companion-skills/companion-skills.module.code.ts"
import type { CompanionState } from "../companion-types/companion-types.module.code.ts"
import { getWeaponRole } from "../companion-weapon-role-match/companion-weapon-role-match.module.code.ts"
import { companionWeaponRoles } from "../companion-weapon-roles/companion-weapon-roles.module.code.ts"
import { companionSkillLines } from "../skill-lines-by-companion/skill-lines-by-companion.module.code.ts"

const NO_SKILL: CompanionSkillId = "no-skill"

export function getValidSkillIds(state: CompanionState): readonly CompanionSkillId[] {
  const companionId = state.companion.id
  const weaponRoleId = getWeaponRole(state)
  const weaponRole = companionWeaponRoles.data[weaponRoleId]
  const armorWeight = getArmorWeightForBaseRoles(state.companion.baseRoles)

  const slottedSkills = new Set(Object.values(state.skills["skill-bar"]))

  return companionSkills.list
    .filter((skill) => {
      if (skill.id === NO_SKILL) return false
      if (skill.skillType !== "active") return false
      if (slottedSkills.has(skill.id)) return false

      const line = companionSkillLines.data[skill.skillLineId]

      switch (line.category) {
        case "class":
          return line.companionId === companionId
        case "weapon":
          return skill.skillLineId === weaponRole.weaponSkillLineId
        case "armor":
          return skill.skillLineId === `armor-${armorWeight}`
        case "guild":
          return true
        default:
          assertNever(line)
      }
    })
    .map((skill) => skill.id)
}
