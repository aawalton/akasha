import type { TemperItemBrowserSource } from "akasha/temper/catalog/world/item-browser-source/temper-item-browser-source.page-type.types.ts"

export const randomDungeon = {
  id: "01a0d9dd-503f-7b0a-a1d5-2ee2fccbe887",
  type: "page-type/temper-item-browser-source",
  slug: "random-dungeon",
  title: "Random Dungeon",
  itemBrowserSourceId: -1,
  itemBrowserPlaceKind: 3,
} as const satisfies TemperItemBrowserSource
