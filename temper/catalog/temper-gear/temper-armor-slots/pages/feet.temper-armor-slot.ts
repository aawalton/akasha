import type { TemperArmorSlot } from "akasha/temper/catalog/temper-gear/temper-armor-slots/temper-armor-slot.page-type.types.ts"

export const feet = {
  id: "01a05fd4-d96d-7048-bcad-e8ae001ada43",
  type: "temper-armor-slot",
  slug: "feet",
  title: "Feet",
  key: "feet",
  icon: "/resources/gearslot_feet.png",
  displayOrder: 6,
} as const satisfies TemperArmorSlot
