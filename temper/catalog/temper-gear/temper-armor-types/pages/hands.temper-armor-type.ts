import type { TemperArmorType } from "akasha/temper/catalog/temper-gear/temper-armor-types/temper-armor-type.page-type.types.ts"

export const hands = {
  id: "01a05fd5-4dce-7497-8a60-3d2aec3761d1",
  type: "temper-armor-type",
  slug: "hands",
  title: "Hands",
  key: "hands",
  armorMultiplier: 4,
  isLargeEnchantSlot: false,
  validSlots: ["hands"],
} as const satisfies TemperArmorType
