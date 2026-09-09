import type { TemperArmorType } from "../temper-armor-type.page-type.ts"

export const shield = {
  id: "01a05fd5-4dcf-7229-b15e-ba21f4283324",
  pageTypeSlug: "temper-armor-type",
  slug: "shield",
  title: "Shield",
  key: "shield",
  armorMultiplier: 1,
  isLargeEnchantSlot: true,
  validSlots: ["off-hand"],
} as const satisfies TemperArmorType
