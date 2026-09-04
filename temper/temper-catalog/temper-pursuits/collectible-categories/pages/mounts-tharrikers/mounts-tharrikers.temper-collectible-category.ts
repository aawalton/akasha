import type { TemperCollectibleCategory } from "../../temper-collectible-category.page-type.ts"

export const mountsTharrikers = {
  id: "01a06165-916a-7003-86d9-2fa208fc8a2b",
  pageTypeSlug: "temper-collectible-category",
  slug: "mounts-tharrikers",
  title: "Tharrikers",
  parent: "mounts",
  collectibles: "jsonl",
} as const satisfies TemperCollectibleCategory
