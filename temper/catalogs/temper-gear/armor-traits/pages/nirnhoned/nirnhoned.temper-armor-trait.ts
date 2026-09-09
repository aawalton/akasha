import type { TemperArmorTrait } from "../../temper-armor-trait.page-type.ts"

export const nirnhoned = {
  id: "01a05fb2-1bd0-79e8-a878-97f1cb25677d",
  pageTypeSlug: "temper-armor-trait",
  slug: "nirnhoned",
  title: "Nirnhoned",
  key: "nirnhoned",
  effect: "Increases Physical and Spell Resistance",
  material: "Fortified Nirncrux",
  esoTraitConstantName: "ITEM_TRAIT_TYPE_ARMOR_NIRNHONED",
  displayOrder: 5,
  qualityValues: "jsonl",
} as const satisfies TemperArmorTrait
