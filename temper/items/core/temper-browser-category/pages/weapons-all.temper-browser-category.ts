import type { TemperBrowserCategory } from "akasha/temper/items/core/temper-browser-category/temper-browser-category.page-type.types.ts"

export const weaponsAll = {
  id: "01a0e10d-1b61-7ba9-8982-6241e83b6645",
  type: "page-type/temper-browser-category",
  slug: "weapons-all",
  title: "All",
  displayOrder: 1,
  match: "Weapons",
  parent: "temper-browser-category/weapons",
} as const satisfies TemperBrowserCategory
