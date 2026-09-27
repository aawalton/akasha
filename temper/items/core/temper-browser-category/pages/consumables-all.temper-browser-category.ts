import type { TemperBrowserCategory } from "akasha/temper/items/core/temper-browser-category/temper-browser-category.page-type.types.ts"

export const consumablesAll = {
  id: "01a0e10d-1b60-7540-bd96-fe2f6cbe6eb7",
  type: "page-type/temper-browser-category",
  slug: "consumables-all",
  title: "All",
  displayOrder: 1,
  parent: "temper-browser-category/consumables",
} as const satisfies TemperBrowserCategory
