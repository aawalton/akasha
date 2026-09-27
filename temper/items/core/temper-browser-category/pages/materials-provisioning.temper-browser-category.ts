import type { TemperBrowserCategory } from "akasha/temper/items/core/temper-browser-category/temper-browser-category.page-type.types.ts"

export const materialsProvisioning = {
  id: "01a0e10d-1b61-7b81-a9aa-26659745ceb6",
  type: "page-type/temper-browser-category",
  slug: "materials-provisioning",
  title: "Provisioning",
  displayOrder: 8,
  match: "Specialized",
  itemTypes: ["temper-item-type/ingredient"],
  specializedItemTypes: [
    "temper-specialized-item-type/ingredient-alcohol",
    "temper-specialized-item-type/ingredient-drink-additive",
    "temper-specialized-item-type/ingredient-food-additive",
    "temper-specialized-item-type/ingredient-fruit",
    "temper-specialized-item-type/ingredient-meat",
    "temper-specialized-item-type/ingredient-rare",
    "temper-specialized-item-type/ingredient-tea",
    "temper-specialized-item-type/ingredient-tonic",
    "temper-specialized-item-type/ingredient-vegetable",
  ],
  parent: "temper-browser-category/materials",
} as const satisfies TemperBrowserCategory
