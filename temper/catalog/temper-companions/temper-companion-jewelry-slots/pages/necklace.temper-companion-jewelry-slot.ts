import type { TemperCompanionJewelrySlot } from "akasha/temper/catalog/temper-companions/temper-companion-jewelry-slots/temper-companion-jewelry-slot.page-type.types.ts"

export const necklace = {
  id: "01a05fcd-ea6a-7416-b4e8-ed813a6519db",
  type: "temper-companion-jewelry-slot",
  slug: "necklace",
  key: "necklace",
  title: "Necklace",
  equipType: 2,
  slotCategory: "necklace",
} as const satisfies TemperCompanionJewelrySlot
