import type { TemperJewelryEnchant } from "../../temper-jewelry-enchant.page-type.ts"

export const increasePhysicalHarm = {
  id: "019e5c85-d93e-7184-bf02-d3098e13d12b",
  pageTypeSlug: "temper-jewelry-enchant",
  slug: "increase-physical-harm",
  title: "Increase Physical Harm",
  key: "increase-physical-harm",
  effect: "Increases Weapon and Spell Damage",
  glyphName: "Glyph of Increase Physical Harm",
  essenceRune: "Taderi",
  esoEnchantConstantName: "ENCHANTMENT_SEARCH_CATEGORY_INCREASE_PHYSICAL_DAMAGE",
  displayOrder: 1,
  effects: "jsonl",
  qualityValues: "jsonl",
} as const satisfies TemperJewelryEnchant
