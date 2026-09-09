import type { TemperCollectibleCategory } from "../../temper-collectible-category.page-type.ts"

export const upgradeInfiniteArchive = {
  id: "01a06165-916a-701b-a353-849f25665e22",
  pageTypeSlug: "temper-collectible-category",
  slug: "upgrade-infinite-archive",
  title: "Infinite Archive",
  parent: "upgrade",
  collectibles: "jsonl",
} as const satisfies TemperCollectibleCategory
