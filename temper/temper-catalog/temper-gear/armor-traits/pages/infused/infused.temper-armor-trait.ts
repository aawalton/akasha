import type { TemperArmorTrait } from "../../temper-armor-trait.page-type.ts"

export const infused = {
  id: "01a05fb2-1bcf-740b-839d-2f0819a8a7ad",
  pageTypeSlug: "temper-armor-trait",
  slug: "infused",
  title: "Infused",
  key: "infused",
  effect: "Increases Armor Enchantment effect",
  material: "Bloodstone",
  esoTraitConstantName: "ITEM_TRAIT_TYPE_ARMOR_INFUSED",
  displayOrder: 3,
  qualityValues: "jsonl",
} as const satisfies TemperArmorTrait
