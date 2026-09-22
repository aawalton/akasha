import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const siegeLancer = {
  id: "01a05fcf-f83d-75ff-a6a1-a5ad0101e10f",
  type: "page-type/temper-item-category-tree",
  slug: "siege-lancer",
  title: "Lancer",
  parent: "temper-item-category-tree/siege-equipment",
  displayOrder: 8,
  specializedItemTypes: [409],
} as const satisfies TemperItemCategoryTree
