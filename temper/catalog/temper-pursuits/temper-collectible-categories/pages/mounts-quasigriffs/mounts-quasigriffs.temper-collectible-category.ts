import type { TemperCollectibleCategory } from "akasha/temper/catalog/temper-pursuits/temper-collectible-categories/temper-collectible-category.page-type.types.ts"

export const mountsQuasigriffs = {
  id: "01a06165-9169-7016-b2ec-0aa2a4d92c13",
  type: "temper-collectible-category",
  slug: "mounts-quasigriffs",
  title: "Quasigriffs",
  parent: "mounts",
  collectibles: "jsonl",
} as const satisfies TemperCollectibleCategory
