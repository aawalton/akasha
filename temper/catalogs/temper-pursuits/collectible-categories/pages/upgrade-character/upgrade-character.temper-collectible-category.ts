import type { TemperCollectibleCategory } from "../../temper-collectible-category.page-type.ts"

export const upgradeCharacter = {
  id: "01a06165-916a-7018-8e8b-52066284e9e6",
  pageTypeSlug: "temper-collectible-category",
  slug: "upgrade-character",
  title: "Character",
  parent: "upgrade",
  collectibles: "jsonl",
} as const satisfies TemperCollectibleCategory
