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
} as const satisfies TemperBrowserCategory
