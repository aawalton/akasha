import { createDataFile } from "@shared/utils-narrow/create-data-file"
import { TEMPER_JEWELRY_SLOTS_BY_ID } from "./generated/temper-jewelry-slot.generated"

export interface JewelrySlotTemplate {
  id: string
  name: string
  typeId: string
  icon: string
}

export const jewelrySlots = createDataFile<JewelrySlotTemplate>()(TEMPER_JEWELRY_SLOTS_BY_ID)

export type JewelrySlotId = (typeof jewelrySlots.ids)[number]
