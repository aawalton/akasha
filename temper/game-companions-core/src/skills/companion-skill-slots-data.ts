import { createDataFile } from "@akasha/utils-narrow/create-data-file"
import type { CompanionState } from "@akasha/temper-companions-core/companion-types"
import { TEMPER_COMPANION_SKILL_SLOTS } from "../generated/temper-companion-skill-slot.generated"
import type { CompanionSkillId } from "@akasha/temper-companions-core/companion-skills"

export interface CompanionSkillSlotTemplate {
  id: string
  name: string
}

export const companionSkillSlots = createDataFile<CompanionSkillSlotTemplate>()(
  TEMPER_COMPANION_SKILL_SLOTS
)

export type CompanionSkillSlotId = (typeof companionSkillSlots.ids)[number]

export function setUltimate(build: CompanionState, skillId: CompanionSkillId): CompanionState {
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
