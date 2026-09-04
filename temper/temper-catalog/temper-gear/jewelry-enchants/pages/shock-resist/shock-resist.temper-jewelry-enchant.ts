import type { TemperJewelryEnchant } from "../../temper-jewelry-enchant.page-type.ts"

export const shockResist = {
  id: "019e5c85-d955-74d8-9a9a-3e66c22bcecb",
  pageTypeSlug: "temper-jewelry-enchant",
  slug: "shock-resist",
  title: "Shock Resist",
  key: "shock-resist",
  effect: "Increases Shock Resistance",
  glyphName: "Glyph of Shock Resist",
  essenceRune: "Meip",
  esoEnchantConstantName: "ENCHANTMENT_SEARCH_CATEGORY_SHOCK_RESISTANT",
  displayOrder: 12,
  effects: "jsonl",
  qualityValues: "jsonl",
} as const satisfies TemperJewelryEnchant
