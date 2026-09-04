import type { TemperCollectibleCategory } from "../../temper-collectible-category.page-type.ts"

export const storiesDungeonDlc = {
  id: "01a06165-916a-7013-a6c4-80619f502075",
  pageTypeSlug: "temper-collectible-category",
  slug: "stories-dungeon-dlc",
  title: "Dungeon DLC",
  parent: "stories",
  collectibles: "jsonl",
} as const satisfies TemperCollectibleCategory
