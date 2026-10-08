import type { TemperBrowserCategory } from "akasha/temper/items/core/temper-browser-category/temper-browser-category.page-type.types.ts"

export const miscellaneousTools = {
  id: "01a0e10d-1b61-7319-9ed7-c0e0fef52968",
  type: "page-type/temper-browser-category",
  slug: "miscellaneous-tools",
  title: "Tools",
  displayOrder: 6,
  match: "Misc",
  itemTypes: ["temper-item-type/tool", "temper-item-type/lockpick"],
  parent: "temper-browser-category/miscellaneous",
  createdAt: "2026-09-27T04:08:47.713Z",
  updatedAt: "2026-09-27T04:34:39.000Z",
} as const satisfies TemperBrowserCategory
