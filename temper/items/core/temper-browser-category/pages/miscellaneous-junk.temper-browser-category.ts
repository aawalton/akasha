import type { TemperBrowserCategory } from "akasha/temper/items/core/temper-browser-category/temper-browser-category.page-type.types.ts"

export const miscellaneousJunk = {
  id: "01a0e10d-1b61-7bb7-8722-e2780068e0b0",
  type: "page-type/temper-browser-category",
  slug: "miscellaneous-junk",
  title: "Junk",
  displayOrder: 10,
  match: "Junk",
  itemTypes: ["temper-item-type/trash"],
  parent: "temper-browser-category/miscellaneous",
  createdAt: "2026-09-27T04:08:47.713Z",
  updatedAt: "2026-09-27T04:34:39.000Z",
} as const satisfies TemperBrowserCategory
