import type { TemperArmorTrait } from "../../temper-armor-trait.page-type.ts"

export const reinforced = {
  id: "01a05fb2-1bd1-7dba-b5ac-0f28ecbae701",
  pageTypeSlug: "temper-armor-trait",
  slug: "reinforced",
  title: "Reinforced",
  key: "reinforced",
  effect: "Increases Armor value",
  material: "Sardonyx",
  esoTraitConstantName: "ITEM_TRAIT_TYPE_ARMOR_REINFORCED",
  displayOrder: 6,
  qualityValues: "jsonl",
} as const satisfies TemperArmorTrait
