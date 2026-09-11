import type { TemperCollectibleCategory } from "akasha/temper/catalog/temper-pursuits/temper-collectible-categories/temper-collectible-category.page-type.types.ts"

export const storiesDungeonDlc = {
  id: "01a06165-916a-7013-a6c4-80619f502075",
  type: "temper-collectible-category",
  slug: "stories-dungeon-dlc",
  title: "Dungeon DLC",
  parent: "stories",
  collectibles: "jsonl",
} as const satisfies TemperCollectibleCategory
