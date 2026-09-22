import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnCraftingStations = {
  id: "01a05fcf-f7ee-7d0e-9b4b-c934d6aa527b",
  type: "page-type/temper-item-category-tree",
  slug: "furn-crafting-stations",
  title: "Crafting Stations",
  parent: "temper-item-category-tree/furn-services",
  displayOrder: 2,
  furnitureSubcategoryIds: [103],
} as const satisfies TemperItemCategoryTree
