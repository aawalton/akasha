import type { TemperArmorType } from "../temper-armor-type.page-type.ts"

export const chest = {
  id: "01a05fd5-4dcd-7a31-8d6f-0a1aa3b9b0df",
  pageTypeSlug: "temper-armor-type",
  slug: "chest",
  title: "Chest",
  key: "chest",
  armorMultiplier: 8,
  isLargeEnchantSlot: true,
  validSlots: ["chest"],
} as const satisfies TemperArmorType
