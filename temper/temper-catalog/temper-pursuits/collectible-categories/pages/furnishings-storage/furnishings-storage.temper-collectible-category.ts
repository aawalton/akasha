import type { TemperCollectibleCategory } from "../../temper-collectible-category.page-type.ts"

export const furnishingsStorage = {
  id: "01a06165-9168-701e-a8d8-ede079833c61",
  pageTypeSlug: "temper-collectible-category",
  slug: "furnishings-storage",
  title: "Storage",
  parent: "furnishings",
  collectibles: "jsonl",
} as const satisfies TemperCollectibleCategory
