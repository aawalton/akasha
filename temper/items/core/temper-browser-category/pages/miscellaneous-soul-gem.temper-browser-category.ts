import type { TemperBrowserCategory } from "akasha/temper/items/core/temper-browser-category/temper-browser-category.page-type.types.ts"

export const miscellaneousSoulGem = {
  id: "01a0e10d-1b61-7613-9fd2-fbfb1b7dcb6e",
  type: "page-type/temper-browser-category",
  slug: "miscellaneous-soul-gem",
  title: "Soul Gem",
  displayOrder: 4,
  match: "Misc",
  itemTypes: ["temper-item-type/soul-gem"],
  parent: "temper-browser-category/miscellaneous",
  createdAt: "2026-09-27T04:08:47.713Z",
  updatedAt: "2026-09-27T04:34:39.000Z",
} as const satisfies TemperBrowserCategory
