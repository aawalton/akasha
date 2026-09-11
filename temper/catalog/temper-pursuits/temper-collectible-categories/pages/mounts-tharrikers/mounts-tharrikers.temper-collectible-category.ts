import type { TemperCollectibleCategory } from "akasha/temper/catalog/temper-pursuits/temper-collectible-categories/temper-collectible-category.page-type.types.ts"

export const mountsTharrikers = {
  id: "01a06165-916a-7003-86d9-2fa208fc8a2b",
  type: "temper-collectible-category",
  slug: "mounts-tharrikers",
  title: "Tharrikers",
  parent: "mounts",
  collectibles: "jsonl",
} as const satisfies TemperCollectibleCategory
