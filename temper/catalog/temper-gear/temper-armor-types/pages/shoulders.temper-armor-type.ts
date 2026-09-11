import type { TemperArmorType } from "akasha/temper/catalog/temper-gear/temper-armor-types/temper-armor-type.page-type.types.ts"

export const shoulders = {
  id: "01a05fd5-4dd0-79c5-bc63-bdac48dfd600",
  pageTypeSlug: "temper-armor-type",
  type: "temper-armor-type",
  slug: "shoulders",
  title: "Shoulders",
  key: "shoulders",
  armorMultiplier: 7,
  isLargeEnchantSlot: false,
  validSlots: ["shoulders"],
} as const satisfies TemperArmorType
