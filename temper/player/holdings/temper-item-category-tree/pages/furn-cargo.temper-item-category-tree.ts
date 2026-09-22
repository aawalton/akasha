import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnCargo = {
  id: "01a05fcf-f7ec-7d91-96e3-bd26a2c222a0",
  type: "page-type/temper-item-category-tree",
  slug: "furn-cargo",
  title: "Cargo",
  parent: "temper-item-category-tree/furn-workshop",
  displayOrder: 0,
  furnitureSubcategoryIds: [94],
} as const satisfies TemperItemCategoryTree
