import type { TemperBrowserCategory } from "akasha/temper/items/core/temper-browser-category/temper-browser-category.page-type.types.ts"

export const furnishings = {
  id: "01a0e10d-1b61-7fa4-89ca-b9852d6bf79b",
  type: "page-type/temper-browser-category",
  slug: "furnishings",
  title: "Furnishings",
  displayOrder: 7,
  match: "Furnishing",
} as const satisfies TemperBrowserCategory
