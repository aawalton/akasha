import type { companionJewelrySlots } from "@akasha/temper-companions-core/companion-jewelry-slots"


export interface CompanionJewelrySlotTemplate {
  id: string
  name: string
  equipType: number
  slotCategory: string
}

export type CompanionJewelrySlotId = (typeof companionJewelrySlots.ids)[number]
