import type { TemperCollectibleCategory } from "../../temper-collectible-category.page-type.ts"

export const furnishingsGeneral = {
  id: "01a06165-9168-701c-94ec-634cb70ee5cb",
  pageTypeSlug: "temper-collectible-category",
  slug: "furnishings-general",
  title: "General",
  parent: "furnishings",
  collectibles: "jsonl",
} as const satisfies TemperCollectibleCategory
