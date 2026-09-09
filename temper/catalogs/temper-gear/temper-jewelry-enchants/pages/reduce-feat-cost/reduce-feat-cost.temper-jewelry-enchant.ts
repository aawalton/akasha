import type { TemperJewelryEnchant } from "../../temper-jewelry-enchant.page-type.ts"

export const reduceFeatCost = {
  id: "019e5c85-d94f-717a-b384-c3148481347b",
  pageTypeSlug: "temper-jewelry-enchant",
  slug: "reduce-feat-cost",
  title: "Reduce Feat Cost",
  key: "reduce-feat-cost",
  effect: "Reduces Stamina ability cost",
  glyphName: "Glyph of Reduce Feat Cost",
  essenceRune: "Taderi",
  esoEnchantConstantName: "ENCHANTMENT_SEARCH_CATEGORY_REDUCE_FEAT_COST",
  displayOrder: 8,
  effects: "jsonl",
  qualityValues: "jsonl",
} as const satisfies TemperJewelryEnchant
