import type { TemperArmorSlot } from "akasha/temper/catalog/temper-gear/temper-armor-slots/temper-armor-slot.page-type.types.ts"

export const shoulders = {
  id: "01a05fd4-d96e-7990-aa6d-647ac22169f4",
  type: "temper-armor-slot",
  slug: "shoulders",
  title: "Shoulders",
  key: "shoulders",
  icon: "/resources/gearslot_shoulders.png",
  displayOrder: 1,
} as const satisfies TemperArmorSlot
