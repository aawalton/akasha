import type { TemperArmorType } from "../temper-armor-type.page-type.ts"

export const hands = {
  id: "01a05fd5-4dce-7497-8a60-3d2aec3761d1",
  pageTypeSlug: "temper-armor-type",
  slug: "hands",
  title: "Hands",
  key: "hands",
  armorMultiplier: 4,
  isLargeEnchantSlot: false,
  validSlots: ["hands"],
} as const satisfies TemperArmorType
