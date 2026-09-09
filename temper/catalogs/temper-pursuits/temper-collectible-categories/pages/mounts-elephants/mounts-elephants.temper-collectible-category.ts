import type { TemperCollectibleCategory } from "../../temper-collectible-category.page-type.ts"

export const mountsElephants = {
  id: "01a06165-9169-700f-8c28-94aeab9d0be6",
  pageTypeSlug: "temper-collectible-category",
  slug: "mounts-elephants",
  title: "Elephants",
  parent: "mounts",
  collectibles: "jsonl",
} as const satisfies TemperCollectibleCategory
