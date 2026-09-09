import type { TemperCollectibleCategory } from "../../temper-collectible-category.page-type.ts"

export const mountsDurzogs = {
  id: "01a06165-9169-700d-b36e-c7a718ef623e",
  pageTypeSlug: "temper-collectible-category",
  slug: "mounts-durzogs",
  title: "Durzogs",
  parent: "mounts",
  collectibles: "jsonl",
} as const satisfies TemperCollectibleCategory
