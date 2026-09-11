import type { TemperArmorTrait } from "akasha/temper/catalog/temper-gear/temper-armor-traits/temper-armor-trait.page-type.types.ts"

export const impenetrable = {
  id: "01a05fb2-1bce-7f82-b0f1-3b03e5065b7b",
  type: "temper-armor-trait",
  slug: "impenetrable",
  title: "Impenetrable",
  key: "impenetrable",
  effect: "Increases Critical Resistance",
  material: "Diamond",
  esoTraitConstantName: "ITEM_TRAIT_TYPE_ARMOR_IMPENETRABLE",
  displayOrder: 2,
  effects: "jsonl",
  qualityValues: "jsonl",
} as const satisfies TemperArmorTrait
