import { createDataFile } from "@shared/utils-narrow/create-data-file"
import { TEMPER_SKILL_SLOTS } from "./generated/temper-skill-slot.generated"

export interface SkillSlotTemplate {
  id: string
  name: string
}

export const skillSlots = createDataFile<SkillSlotTemplate>()(TEMPER_SKILL_SLOTS)

export type SkillSlotId = (typeof skillSlots.ids)[number]

export const activeSkillSlots = skillSlots.list.filter((slot) => slot.id !== "ultimate")
