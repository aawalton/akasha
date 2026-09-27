import type { TemperBrowserCategory } from "akasha/temper/items/core/temper-browser-category/temper-browser-category.page-type.types.ts"

export const consumablesRecipe = {
  id: "01a0e10d-1b61-7037-aad2-bbc7b1babd99",
  type: "page-type/temper-browser-category",
  slug: "consumables-recipe",
  title: "Recipe",
  displayOrder: 4,
  parent: "temper-browser-category/consumables",
} as const satisfies TemperBrowserCategory
