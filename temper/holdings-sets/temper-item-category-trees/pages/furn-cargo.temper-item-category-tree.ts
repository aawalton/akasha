import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const furnCargo = {
  id: "01a05fcf-f7ec-7d91-96e3-bd26a2c222a0",
  pageTypeSlug: "temper-item-category-tree",
  slug: "furn-cargo",
  title: "Cargo",
  parent: "furn-workshop",
  displayOrder: 0,
  furnitureSubcategoryIds: [94],
} as const satisfies TemperItemCategoryTree
