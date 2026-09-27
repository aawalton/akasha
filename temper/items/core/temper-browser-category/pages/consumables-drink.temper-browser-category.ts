import type { TemperBrowserCategory } from "akasha/temper/items/core/temper-browser-category/temper-browser-category.page-type.types.ts"

export const consumablesDrink = {
  id: "01a0e10d-1b60-7853-a851-53527e49df44",
  type: "page-type/temper-browser-category",
  slug: "consumables-drink",
  title: "Drink",
  displayOrder: 3,
  parent: "temper-browser-category/consumables",
} as const satisfies TemperBrowserCategory
