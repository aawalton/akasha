import type { TemperBrowserCategory } from "akasha/temper/items/core/temper-browser-category/temper-browser-category.page-type.types.ts"

export const materialsEnchanting = {
  id: "01a0e10d-1b61-7322-928d-36274e1ed282",
  type: "page-type/temper-browser-category",
  slug: "materials-enchanting",
  title: "Enchanting",
  displayOrder: 7,
  parent: "temper-browser-category/materials",
} as const satisfies TemperBrowserCategory
