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
} as const satisfies TemperBrowserCategory
