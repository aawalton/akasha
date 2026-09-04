import type { TemperJewelryTrait } from "../../temper-jewelry-trait.page-type.ts"

export const healthy = {
  id: "019e5b97-6d8c-7e89-9ce9-e8824281f2c5",
  pageTypeSlug: "temper-jewelry-trait",
  slug: "healthy",
  title: "Healthy",
  key: "healthy",
  effect: "Increases Maximum Health",
  material: "Antimony",
  esoTraitConstantName: "ITEM_TRAIT_TYPE_JEWELRY_HEALTHY",
  displayOrder: 4,
  effects: "jsonl",
  qualityValues: "jsonl",
} as const satisfies TemperJewelryTrait
