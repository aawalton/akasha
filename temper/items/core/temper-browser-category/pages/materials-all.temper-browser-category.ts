import type { TemperBrowserCategory } from "akasha/temper/items/core/temper-browser-category/temper-browser-category.page-type.types.ts"

export const materialsAll = {
  id: "01a0e10d-1b61-7e17-9980-c64b56918315",
  type: "page-type/temper-browser-category",
  slug: "materials-all",
  title: "All",
  displayOrder: 1,
  parent: "temper-browser-category/materials",
} as const satisfies TemperBrowserCategory
