import type { TemperCollectibleCategory } from "../../temper-collectible-category.page-type.ts"

export const mountsHorses = {
  id: "01a06165-9169-7011-9a6f-715a034d1287",
  pageTypeSlug: "temper-collectible-category",
  slug: "mounts-horses",
  title: "Horses",
  parent: "mounts",
  collectibles: "jsonl",
} as const satisfies TemperCollectibleCategory
