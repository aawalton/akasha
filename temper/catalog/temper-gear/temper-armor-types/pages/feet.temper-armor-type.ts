import type { TemperArmorType } from "akasha/temper/catalog/temper-gear/temper-armor-types/temper-armor-type.page-type.types.ts"

export const feet = {
  id: "01a05fd5-4dce-7ec8-a159-0d074dc6eec1",
  type: "temper-armor-type",
  slug: "feet",
  title: "Feet",
  key: "feet",
  armorMultiplier: 7,
  isLargeEnchantSlot: false,
  validSlots: ["feet"],
} as const satisfies TemperArmorType
