import type { TemperJewelryTrait } from "../../temper-jewelry-trait.page-type.ts"

export const protective = {
  id: "019e5b97-6d92-72c7-9fd1-340ac0828a70",
  pageTypeSlug: "temper-jewelry-trait",
  slug: "protective",
  title: "Protective",
  key: "protective",
  effect: "Increases Physical and Spell Resistance",
  material: "Titanium",
  esoTraitConstantName: "ITEM_TRAIT_TYPE_JEWELRY_PROTECTIVE",
  displayOrder: 6,
  effects: "jsonl",
  qualityValues: "jsonl",
} as const satisfies TemperJewelryTrait
