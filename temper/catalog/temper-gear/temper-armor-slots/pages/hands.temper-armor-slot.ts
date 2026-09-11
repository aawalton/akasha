import type { TemperArmorSlot } from "akasha/temper/catalog/temper-gear/temper-armor-slots/temper-armor-slot.page-type.types.ts"

export const hands = {
  id: "01a05fd4-d96d-7959-b20d-dfda8b43bc6b",
  pageTypeSlug: "temper-armor-slot",
  type: "temper-armor-slot",
  slug: "hands",
  title: "Hands",
  key: "hands",
  icon: "/resources/gearslot_hands.png",
  displayOrder: 3,
} as const satisfies TemperArmorSlot
