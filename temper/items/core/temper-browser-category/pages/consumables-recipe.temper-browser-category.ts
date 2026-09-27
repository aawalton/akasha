import type { TemperBrowserCategory } from "akasha/temper/items/core/temper-browser-category/temper-browser-category.page-type.types.ts"

export const consumablesRecipe = {
  id: "01a0e10d-1b61-7037-aad2-bbc7b1babd99",
  type: "page-type/temper-browser-category",
  slug: "consumables-recipe",
  title: "Recipe",
  displayOrder: 4,
  match: "Specialized",
  itemTypes: ["temper-item-type/recipe"],
  specializedItemTypes: [
    "temper-specialized-item-type/recipe-alchemy-formula-furnishing",
    "temper-specialized-item-type/recipe-blacksmithing-diagram-furnishing",
    "temper-specialized-item-type/recipe-clothier-pattern-furnishing",
    "temper-specialized-item-type/recipe-enchanting-schematic-furnishing",
    "temper-specialized-item-type/recipe-jewelrycrafting-sketch-furnishing",
    "temper-specialized-item-type/recipe-provisioning-design-furnishing",
    "temper-specialized-item-type/recipe-woodworking-blueprint-furnishing",
    "temper-specialized-item-type/recipe-provisioning-standard-drink",
    "temper-specialized-item-type/recipe-provisioning-standard-food",
  ],
  parent: "temper-browser-category/consumables",
} as const satisfies TemperBrowserCategory
