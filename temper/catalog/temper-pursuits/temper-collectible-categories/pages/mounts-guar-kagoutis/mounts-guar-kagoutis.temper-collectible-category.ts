import type { TemperCollectibleCategory } from "akasha/temper/catalog/temper-pursuits/temper-collectible-categories/temper-collectible-category.page-type.types.ts"

export const mountsGuarKagoutis = {
  id: "01a06165-9169-7010-90ad-5c9091ef7a71",
  type: "temper-collectible-category",
  slug: "mounts-guar-kagoutis",
  title: "Guar & Kagoutis",
  parent: "mounts",
  collectibles: "jsonl",
} as const satisfies TemperCollectibleCategory
