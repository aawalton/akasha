import type { TemperBrowserCategory } from "akasha/temper/items/core/temper-browser-category/temper-browser-category.page-type.types.ts"

export const materialsAlchemy = {
  id: "01a0e10d-1b61-7618-9679-eb324e1d4ff0",
  type: "page-type/temper-browser-category",
  slug: "materials-alchemy",
  title: "Alchemy",
  displayOrder: 6,
  parent: "temper-browser-category/materials",
} as const satisfies TemperBrowserCategory
