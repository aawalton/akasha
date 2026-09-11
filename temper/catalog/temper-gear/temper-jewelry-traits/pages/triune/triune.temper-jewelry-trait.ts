import type { TemperJewelryTrait } from "akasha/temper/catalog/temper-gear/temper-jewelry-traits/temper-jewelry-trait.page-type.types.ts"

export const triune = {
  id: "019e5b97-6d96-7db5-902b-64e6d928282a",
  type: "temper-jewelry-trait",
  slug: "triune",
  title: "Triune",
  key: "triune",
  effect: "Increases Maximum Health, Magicka, and Stamina",
  material: "Dawn-Prism",
  esoTraitConstantName: "ITEM_TRAIT_TYPE_JEWELRY_TRIUNE",
  displayOrder: 9,
  effects: "jsonl",
  qualityValues: "jsonl",
} as const satisfies TemperJewelryTrait
