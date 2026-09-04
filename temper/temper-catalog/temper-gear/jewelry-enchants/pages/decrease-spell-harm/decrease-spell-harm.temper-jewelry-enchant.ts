import type { TemperJewelryEnchant } from "../../temper-jewelry-enchant.page-type.ts"

export const decreaseSpellHarm = {
  id: "019e5c85-d95c-73c8-bb14-91cea6c435c1",
  pageTypeSlug: "temper-jewelry-enchant",
  slug: "decrease-spell-harm",
  title: "Decrease Spell Harm",
  key: "decrease-spell-harm",
  effect: "Increases Spell Resistance",
  glyphName: "Glyph of Decrease Spell Harm",
  essenceRune: "Makderi",
  esoEnchantConstantName: "ENCHANTMENT_SEARCH_CATEGORY_DECREASE_SPELL_DAMAGE",
  displayOrder: 16,
  effects: "jsonl",
  qualityValues: "jsonl",
} as const satisfies TemperJewelryEnchant
