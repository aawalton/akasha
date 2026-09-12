import type { CompanionState } from "akasha/temper/companions-core/companion-types/companion-types.module.code.ts"
import type { CompanionId } from "akasha/temper/companions-core/companions/companions.module.code.ts"
import { companionArmorSlots } from "akasha/temper/companions-core/modules/companion-armor-slots/companion-armor-slots.module.code.ts"
import type { CompanionArmorWeight } from "akasha/temper/companions-core/modules/companion-armor-weights/companion-armor-weights.module.code.ts"
import {
  type CompanionBaseRoleId,
  getArmorWeightForBaseRoles,
} from "akasha/temper/companions-core/modules/companion-base-roles/companion-base-roles.module.code.ts"
import {
  type CompanionSkillId,
  getDefaultUltimateForCompanion,
} from "akasha/temper/companions-core/modules/companion-skills/companion-skills.module.code.ts"

function setAllArmorWeights(build: CompanionState, weight: CompanionArmorWeight): CompanionState {
  const armor = { ...build.equipment.armor }
  for (const slotId of companionArmorSlots.ids) {
    const slot = armor[slotId]
    if (slot.itemType === "armor") {
      armor[slotId] = { ...slot, data: { ...slot.data, weight } }
    }
  }
  return { ...build, equipment: { ...build.equipment, armor } }
}

export function setBaseRoles(
  build: CompanionState,
  roles: readonly CompanionBaseRoleId[]
): CompanionState {
  const withRoles = {
    ...build,
    companion: {
      ...build.companion,
      baseRoles: roles,
    },
  }
  return setAllArmorWeights(withRoles, getArmorWeightForBaseRoles(roles))
}

function setUltimate(build: CompanionState, skillId: CompanionSkillId): CompanionState {
  return {
    ...build,
    skills: {
      ...build.skills,
      "skill-bar": {
        ...build.skills["skill-bar"],
        ultimate: skillId,
      },
    },
  }
}

export function setCompanion(build: CompanionState, companionId: CompanionId): CompanionState {
  return setUltimate(
    {
      ...build,
      companion: {
        ...build.companion,
        id: companionId,
      },
    },
    getDefaultUltimateForCompanion(companionId)
  )
}
