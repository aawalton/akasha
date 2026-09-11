import type { TemperArmorTrait } from "akasha/temper/catalog/temper-gear/temper-armor-traits/temper-armor-trait.page-type.types.ts"

export const infused = {
  id: "01a05fb2-1bcf-740b-839d-2f0819a8a7ad",
  type: "temper-armor-trait",
  slug: "infused",
  title: "Infused",
  key: "infused",
  effect: "Increases Armor Enchantment effect",
  material: "Bloodstone",
  esoTraitConstantName: "ITEM_TRAIT_TYPE_ARMOR_INFUSED",
  displayOrder: 3,
  qualityValues: "jsonl",
} as const satisfies TemperArmorTrait
