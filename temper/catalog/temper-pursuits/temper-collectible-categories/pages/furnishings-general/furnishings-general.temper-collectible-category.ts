import type { TemperCollectibleCategory } from "akasha/temper/catalog/temper-pursuits/temper-collectible-categories/temper-collectible-category.page-type.types.ts"

export const furnishingsGeneral = {
  id: "01a06165-9168-701c-94ec-634cb70ee5cb",
  type: "temper-collectible-category",
  slug: "furnishings-general",
  title: "General",
  parent: "furnishings",
  collectibles: "jsonl",
} as const satisfies TemperCollectibleCategory
