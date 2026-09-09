import type { TemperArmorType } from "../temper-armor-type.page-type.ts"

export const waist = {
  id: "01a05fd5-4dd0-7b4e-a6cf-104b294b6966",
  pageTypeSlug: "temper-armor-type",
  slug: "waist",
  title: "Waist",
  key: "waist",
  armorMultiplier: 3,
  isLargeEnchantSlot: false,
  validSlots: ["waist"],
} as const satisfies TemperArmorType
