import type { TemperBrowserCategory } from "akasha/temper/items/core/temper-browser-category/temper-browser-category.page-type.types.ts"

export const miscellaneousBait = {
  id: "01a0e10d-1b61-7bdf-bc46-ce4e90b061cb",
  type: "page-type/temper-browser-category",
  slug: "miscellaneous-bait",
  title: "Bait",
  displayOrder: 8,
  match: "Misc",
  itemTypes: ["temper-item-type/lure"],
  parent: "temper-browser-category/miscellaneous",
  createdAt: "2026-09-27T04:08:47.713Z",
  updatedAt: "2026-09-27T04:34:39.000Z",
} as const satisfies TemperBrowserCategory
