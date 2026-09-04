import type { TemperJewelryTrait } from "../../temper-jewelry-trait.page-type.ts"

export const bloodthirsty = {
  id: "019e5b97-6d87-7ebe-8b8a-90f7afd5b457",
  pageTypeSlug: "temper-jewelry-trait",
  slug: "bloodthirsty",
  title: "Bloodthirsty",
  key: "bloodthirsty",
  effect:
    "Increases Weapon and Spell Damage against enemies under 90% Health (scales with missing health)",
  material: "Slaughterstone",
  esoTraitConstantName: "ITEM_TRAIT_TYPE_JEWELRY_BLOODTHIRSTY",
  displayOrder: 2,
  qualityValues: "jsonl",
} as const satisfies TemperJewelryTrait
