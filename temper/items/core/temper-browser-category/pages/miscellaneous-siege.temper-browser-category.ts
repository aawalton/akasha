import type { TemperBrowserCategory } from "akasha/temper/items/core/temper-browser-category/temper-browser-category.page-type.types.ts"

export const miscellaneousSiege = {
  id: "01a0e10d-1b61-7cda-ae7e-7a7c7850a225",
  type: "page-type/temper-browser-category",
  slug: "miscellaneous-siege",
  title: "Siege",
  displayOrder: 5,
  parent: "temper-browser-category/miscellaneous",
} as const satisfies TemperBrowserCategory
