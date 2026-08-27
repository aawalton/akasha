import { createDataFile } from "@shared/utils-narrow/create-data-file"
import type { CompanionArmorWeight, CompanionState } from "../companion-types"
import { TEMPER_COMPANION_ARMOR_SLOTS_BY_ID } from "../generated/temper-companion-armor-slot.generated"

export interface CompanionArmorSlotTemplate {
  id: string
  name: string
  equipType: number
}

export const companionArmorSlots = createDataFile<CompanionArmorSlotTemplate>()(
  TEMPER_COMPANION_ARMOR_SLOTS_BY_ID
)

export type CompanionArmorSlotId = (typeof companionArmorSlots.ids)[number]

export function setAllArmorWeights(
  build: CompanionState,
  weight: CompanionArmorWeight
): CompanionState {
  const armor = { ...build.equipment.armor }
  for (const slotId of companionArmorSlots.ids) {
    const slot = armor[slotId]
    if (slot.itemType === "armor") {
      armor[slotId] = { ...slot, data: { ...slot.data, weight } }
    }
  }
  return { ...build, equipment: { ...build.equipment, armor } }
}
