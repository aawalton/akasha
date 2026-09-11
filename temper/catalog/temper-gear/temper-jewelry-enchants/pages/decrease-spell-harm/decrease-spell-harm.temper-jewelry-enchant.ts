import type { TemperJewelryEnchant } from "akasha/temper/catalog/temper-gear/temper-jewelry-enchants/temper-jewelry-enchant.page-type.types.ts"

export const decreaseSpellHarm = {
  id: "019e5c85-d95c-73c8-bb14-91cea6c435c1",
  type: "temper-jewelry-enchant",
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
