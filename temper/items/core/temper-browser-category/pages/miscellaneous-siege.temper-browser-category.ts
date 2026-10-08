import type { TemperBrowserCategory } from "akasha/temper/items/core/temper-browser-category/temper-browser-category.page-type.types.ts"

export const miscellaneousSiege = {
  id: "01a0e10d-1b61-7cda-ae7e-7a7c7850a225",
  type: "page-type/temper-browser-category",
  slug: "miscellaneous-siege",
  title: "Siege",
  displayOrder: 5,
  match: "Misc",
  itemTypes: ["temper-item-type/siege"],
  parent: "temper-browser-category/miscellaneous",
  createdAt: "2026-09-27T04:08:47.713Z",
  updatedAt: "2026-09-27T04:34:39.000Z",
} as const satisfies TemperBrowserCategory
