import type { TemperJewelryEnchant } from "../../temper-jewelry-enchant.page-type.ts"

export const decreasePhysicalHarm = {
  id: "019e5c85-d95a-7784-a28f-1fd9cfff52da",
  pageTypeSlug: "temper-jewelry-enchant",
  slug: "decrease-physical-harm",
  title: "Decrease Physical Harm",
  key: "decrease-physical-harm",
  effect: "Increases Physical Resistance",
  glyphName: "Glyph of Decrease Physical Harm",
  essenceRune: "Taderi",
  esoEnchantConstantName: "ENCHANTMENT_SEARCH_CATEGORY_DECREASE_PHYSICAL_DAMAGE",
  displayOrder: 15,
  effects: "jsonl",
  qualityValues: "jsonl",
} as const satisfies TemperJewelryEnchant
