import type { TemperBrowserCategory } from "akasha/temper/items/core/temper-browser-category/temper-browser-category.page-type.types.ts"

export const materialsTraits = {
  id: "01a0e10d-1b61-77a7-b2b9-da62e8f36cfa",
  type: "page-type/temper-browser-category",
  slug: "materials-traits",
  title: "Traits",
  displayOrder: 10,
  parent: "temper-browser-category/materials",
} as const satisfies TemperBrowserCategory
