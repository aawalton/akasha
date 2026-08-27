import { assertNever } from "../../../../shared/utils-narrow/src/assert-never"
import { getArmorWeightForBaseRoles } from "../companion-base-roles-data"
import type { CompanionState } from "../companion-types"
import { companionWeaponRoles, getWeaponRole } from "../equipment/companion-weapon-roles-data"
import { companionSkillLines } from "../generated/temper-companion-skill-line.generated"
import { type CompanionSkillId, companionSkills } from "../skills/companion-skills-data"

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
