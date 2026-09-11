import type { TemperCollectibleCategory } from "akasha/temper/catalog/temper-pursuits/temper-collectible-categories/temper-collectible-category.page-type.types.ts"

export const appearanceSkins = {
  id: "01a06165-9165-7006-b290-9d967e84415c",
  type: "temper-collectible-category",
  slug: "appearance-skins",
  title: "Skins",
  parent: "appearance",
  collectibles: "jsonl",
} as const satisfies TemperCollectibleCategory
