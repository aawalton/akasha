import type { TemperJewelryEnchant } from "../../temper-jewelry-enchant.page-type.ts"

export const reduceSpellCost = {
  id: "019e5c85-d94d-77bd-b10c-f85cf52b46e4",
  pageTypeSlug: "temper-jewelry-enchant",
  slug: "reduce-spell-cost",
  title: "Reduce Spell Cost",
  key: "reduce-spell-cost",
  effect: "Reduces Magicka ability cost",
  glyphName: "Glyph of Reduce Spell Cost",
  essenceRune: "Makderi",
  esoEnchantConstantName: "ENCHANTMENT_SEARCH_CATEGORY_REDUCE_SPELL_COST",
  displayOrder: 7,
  effects: "jsonl",
  qualityValues: "jsonl",
} as const satisfies TemperJewelryEnchant
