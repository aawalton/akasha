import type { TemperBrowserCategory } from "akasha/temper/items/core/temper-browser-category/temper-browser-category.page-type.types.ts"

export const consumablesFood = {
  id: "01a0e10d-1b60-7210-84ec-07a335204fdb",
  type: "page-type/temper-browser-category",
  slug: "consumables-food",
  title: "Food",
  displayOrder: 2,
  parent: "temper-browser-category/consumables",
} as const satisfies TemperBrowserCategory
