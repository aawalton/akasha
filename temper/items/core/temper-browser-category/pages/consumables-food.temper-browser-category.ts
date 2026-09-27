import type { TemperBrowserCategory } from "akasha/temper/items/core/temper-browser-category/temper-browser-category.page-type.types.ts"

export const consumablesFood = {
  id: "01a0e10d-1b60-7210-84ec-07a335204fdb",
  type: "page-type/temper-browser-category",
  slug: "consumables-food",
  title: "Food",
  displayOrder: 2,
  match: "Specialized",
  itemTypes: ["temper-item-type/food"],
  specializedItemTypes: [
    "temper-specialized-item-type/food-entremet",
    "temper-specialized-item-type/food-fruit",
    "temper-specialized-item-type/food-gourmet",
    "temper-specialized-item-type/food-meat",
    "temper-specialized-item-type/food-ragout",
    "temper-specialized-item-type/food-savoury",
    "temper-specialized-item-type/food-unique",
    "temper-specialized-item-type/food-vegetable",
  ],
  parent: "temper-browser-category/consumables",
} as const satisfies TemperBrowserCategory
