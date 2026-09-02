import { assertNever } from "@akasha/utils-narrow/assert-never"
import { getArmorWeightForBaseRoles } from "@akasha/temper-companions-core/companion-base-roles"
import type { CompanionState } from "@akasha/temper-companions-core/companion-types"
import { companionWeaponRoles, getWeaponRole } from "../equipment/companion-weapon-roles-data"
import { companionSkillLines } from "@akasha/temper-companions-core/skill-lines-by-companion"
import { type CompanionSkillId, companionSkills } from "@akasha/temper-companions-core/companion-skills"

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
