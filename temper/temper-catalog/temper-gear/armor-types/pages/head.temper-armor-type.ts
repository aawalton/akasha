import type { TemperArmorType } from "../temper-armor-type.page-type.ts"

export const head = {
  id: "01a05fd5-4dcf-7b10-8d5b-cb0c96173698",
  pageTypeSlug: "temper-armor-type",
  slug: "head",
  title: "Head",
  key: "head",
  armorMultiplier: 7,
  isLargeEnchantSlot: true,
  validSlots: ["head"],
} as const satisfies TemperArmorType
