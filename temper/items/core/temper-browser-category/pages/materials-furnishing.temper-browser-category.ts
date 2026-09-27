import type { TemperBrowserCategory } from "akasha/temper/items/core/temper-browser-category/temper-browser-category.page-type.types.ts"

export const materialsFurnishing = {
  id: "01a0e10d-1b61-723d-9305-fed57bddf979",
  type: "page-type/temper-browser-category",
  slug: "materials-furnishing",
  title: "Furnishing",
  displayOrder: 11,
  parent: "temper-browser-category/materials",
} as const satisfies TemperBrowserCategory
