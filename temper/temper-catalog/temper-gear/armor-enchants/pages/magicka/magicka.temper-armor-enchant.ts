import type { TemperArmorEnchant } from "../../temper-armor-enchant.page-type.ts"

export const magicka = {
  id: "01a05fd4-d96b-7fb6-8535-b1728715ed14",
  pageTypeSlug: "temper-armor-enchant",
  slug: "magicka",
  title: "Magicka",
  key: "magicka",
  effect: "Increases Maximum Magicka",
  glyphName: "Glyph of Magicka",
  essenceRune: "Makko",
  esoEnchantConstantName: "ENCHANTMENT_SEARCH_CATEGORY_MAGICKA",
  displayOrder: 2,
  effects: "jsonl",
  qualityValues: "jsonl",
} as const satisfies TemperArmorEnchant
