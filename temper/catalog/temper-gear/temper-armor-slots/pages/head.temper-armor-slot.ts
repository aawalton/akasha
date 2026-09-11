import type { TemperArmorSlot } from "akasha/temper/catalog/temper-gear/temper-armor-slots/temper-armor-slot.page-type.types.ts"

export const head = {
  id: "01a05fd4-d96d-706f-9d80-32f481500169",
  type: "temper-armor-slot",
  slug: "head",
  title: "Head",
  key: "head",
  icon: "/resources/gearslot_head.png",
  displayOrder: 0,
} as const satisfies TemperArmorSlot
