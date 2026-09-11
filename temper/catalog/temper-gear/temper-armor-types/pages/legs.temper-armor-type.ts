import type { TemperArmorType } from "akasha/temper/catalog/temper-gear/temper-armor-types/temper-armor-type.page-type.types.ts"

export const legs = {
  id: "01a05fd5-4dcf-7077-8afd-71a92f2d45a3",
  type: "temper-armor-type",
  slug: "legs",
  title: "Legs",
  key: "legs",
  armorMultiplier: 7,
  isLargeEnchantSlot: true,
  validSlots: ["legs"],
} as const satisfies TemperArmorType
