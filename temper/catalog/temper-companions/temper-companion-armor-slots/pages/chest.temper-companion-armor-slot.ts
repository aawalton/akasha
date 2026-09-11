import type { TemperCompanionArmorSlot } from "akasha/temper/catalog/temper-companions/temper-companion-armor-slots/temper-companion-armor-slot.page-type.types.ts"

export const chest = {
  id: "01a05fcd-ea67-7f46-aba6-39f80b72f2b6",
  type: "temper-companion-armor-slot",
  slug: "chest",
  key: "chest",
  title: "Chest",
  equipType: 3,
} as const satisfies TemperCompanionArmorSlot
