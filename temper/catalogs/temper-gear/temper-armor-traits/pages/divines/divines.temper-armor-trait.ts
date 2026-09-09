import type { TemperArmorTrait } from "../../temper-armor-trait.page-type.ts"

export const divines = {
  id: "01a05fb2-1bcd-7a96-a41e-bbf2b55ec3ec",
  pageTypeSlug: "temper-armor-trait",
  slug: "divines",
  title: "Divines",
  key: "divines",
  effect: "Increases Mundus Stone effect",
  material: "Sapphire",
  esoTraitConstantName: "ITEM_TRAIT_TYPE_ARMOR_DIVINES",
  displayOrder: 1,
  qualityValues: "jsonl",
} as const satisfies TemperArmorTrait
