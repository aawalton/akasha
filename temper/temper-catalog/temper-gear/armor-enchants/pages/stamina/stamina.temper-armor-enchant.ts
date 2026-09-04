import type { TemperArmorEnchant } from "../../temper-armor-enchant.page-type.ts"

export const stamina = {
  id: "01a05fd4-d96c-7e66-8940-ca31af8c2c46",
  pageTypeSlug: "temper-armor-enchant",
  slug: "stamina",
  title: "Stamina",
  key: "stamina",
  effect: "Increases Maximum Stamina",
  glyphName: "Glyph of Stamina",
  essenceRune: "Deni",
  esoEnchantConstantName: "ENCHANTMENT_SEARCH_CATEGORY_STAMINA",
  displayOrder: 3,
  effects: "jsonl",
  qualityValues: "jsonl",
} as const satisfies TemperArmorEnchant
