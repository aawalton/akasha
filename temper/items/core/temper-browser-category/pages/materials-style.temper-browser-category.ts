import type { TemperBrowserCategory } from "akasha/temper/items/core/temper-browser-category/temper-browser-category.page-type.types.ts"

export const materialsStyle = {
  id: "01a0e10d-1b61-7efa-9ba6-b75fa25d2819",
  type: "page-type/temper-browser-category",
  slug: "materials-style",
  title: "Style",
  displayOrder: 9,
  match: "Materials",
  itemTypes: ["temper-item-type/style-material"],
  parent: "temper-browser-category/materials",
  createdAt: "2026-09-27T04:08:47.713Z",
  updatedAt: "2026-09-27T04:34:39.000Z",
} as const satisfies TemperBrowserCategory
