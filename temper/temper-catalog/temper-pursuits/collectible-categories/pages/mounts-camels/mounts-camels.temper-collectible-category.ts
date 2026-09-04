import type { TemperCollectibleCategory } from "../../temper-collectible-category.page-type.ts"

export const mountsCamels = {
  id: "01a06165-9169-700b-85b4-7a047906c0f2",
  pageTypeSlug: "temper-collectible-category",
  slug: "mounts-camels",
  title: "Camels",
  parent: "mounts",
  collectibles: "jsonl",
} as const satisfies TemperCollectibleCategory
