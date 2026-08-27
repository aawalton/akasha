import type { companionJewelrySlots } from "../generated/temper-companion-jewelry-slot.generated"


export interface CompanionJewelrySlotTemplate {
  id: string
  name: string
  equipType: number
  slotCategory: string
}

export type CompanionJewelrySlotId = (typeof companionJewelrySlots.ids)[number]
