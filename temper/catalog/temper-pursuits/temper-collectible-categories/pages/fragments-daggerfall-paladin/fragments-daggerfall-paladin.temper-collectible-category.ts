import type { TemperCollectibleCategory } from "akasha/temper/catalog/temper-pursuits/temper-collectible-categories/temper-collectible-category.page-type.types.ts"

export const fragmentsDaggerfallPaladin = {
  id: "01a06165-9167-700d-a13c-f6686358129b",
  type: "temper-collectible-category",
  slug: "fragments-daggerfall-paladin",
  title: "Daggerfall Paladin",
  parent: "fragments",
  collectibles: "jsonl",
} as const satisfies TemperCollectibleCategory
