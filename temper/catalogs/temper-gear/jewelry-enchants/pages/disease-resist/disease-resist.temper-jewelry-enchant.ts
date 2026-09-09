import type { TemperJewelryEnchant } from "../../temper-jewelry-enchant.page-type.ts"

export const diseaseResist = {
  id: "019e5c85-d958-7929-b633-93f9969ac5f2",
  pageTypeSlug: "temper-jewelry-enchant",
  slug: "disease-resist",
  title: "Disease Resist",
  key: "disease-resist",
  effect: "Increases Disease Resistance",
  glyphName: "Glyph of Disease Resist",
  essenceRune: "Haoko",
  esoEnchantConstantName: "ENCHANTMENT_SEARCH_CATEGORY_DISEASE_RESISTANT",
  displayOrder: 14,
  effects: "jsonl",
  qualityValues: "jsonl",
} as const satisfies TemperJewelryEnchant
