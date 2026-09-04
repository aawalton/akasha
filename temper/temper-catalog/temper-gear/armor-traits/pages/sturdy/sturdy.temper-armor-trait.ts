import type { TemperArmorTrait } from "../../temper-armor-trait.page-type.ts"

export const sturdy = {
  id: "01a05fb2-1bd1-7a1a-a411-c520da348cc8",
  pageTypeSlug: "temper-armor-trait",
  slug: "sturdy",
  title: "Sturdy",
  key: "sturdy",
  effect: "Reduces Block cost",
  material: "Quartz",
  esoTraitConstantName: "ITEM_TRAIT_TYPE_ARMOR_STURDY",
  displayOrder: 7,
  effects: "jsonl",
  qualityValues: "jsonl",
} as const satisfies TemperArmorTrait
