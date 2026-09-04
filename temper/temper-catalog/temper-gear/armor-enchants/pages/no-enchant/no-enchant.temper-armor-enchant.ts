import type { TemperArmorEnchant } from "../../temper-armor-enchant.page-type.ts"

export const noEnchant = {
  id: "01a05fd4-d96b-7b53-81ee-e3e4ad27fd5a",
  pageTypeSlug: "temper-armor-enchant",
  slug: "no-enchant",
  title: "No Enchant",
  key: "no-enchant",
  esoEnchantConstantName: "ENCHANTMENT_SEARCH_CATEGORY_NONE",
  displayOrder: 0,
} as const satisfies TemperArmorEnchant
