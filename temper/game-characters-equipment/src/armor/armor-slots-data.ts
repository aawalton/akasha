import { createDataFile } from "@shared/utils-narrow/create-data-file"
import { TEMPER_ARMOR_SLOTS_BY_ID } from "./generated/temper-armor-slot.generated"

export interface ArmorSlotTemplate {
  id: string
  name: string
  icon: string
}

export const armorSlots = createDataFile<ArmorSlotTemplate>()(TEMPER_ARMOR_SLOTS_BY_ID)

export type ArmorSlotId = (typeof armorSlots.ids)[number]
