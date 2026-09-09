import type { TemperCollectibleCategory } from "../../temper-collectible-category.page-type.ts"

export const mountsToys = {
  id: "01a06165-916a-7004-a6c7-ee329c2213d9",
  pageTypeSlug: "temper-collectible-category",
  slug: "mounts-toys",
  title: "Toys",
  parent: "mounts",
  collectibles: "jsonl",
} as const satisfies TemperCollectibleCategory
