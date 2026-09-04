import type { TemperArmorTrait } from "../../temper-armor-trait.page-type.ts"

export const wellFitted = {
  id: "01a05fb2-1bd1-73f9-bcca-bd39fc693315",
  pageTypeSlug: "temper-armor-trait",
  slug: "well-fitted",
  title: "Well-Fitted",
  key: "well-fitted",
  effect: "Reduces Roll Dodge and Sprint cost",
  material: "Almandine",
  esoTraitConstantName: "ITEM_TRAIT_TYPE_ARMOR_WELL_FITTED",
  displayOrder: 9,
  effects: "jsonl",
  qualityValues: "jsonl",
} as const satisfies TemperArmorTrait
