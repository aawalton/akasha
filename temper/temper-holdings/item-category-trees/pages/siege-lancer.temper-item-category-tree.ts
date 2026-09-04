import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const siegeLancer = {
  id: "01a05fcf-f83d-75ff-a6a1-a5ad0101e10f",
  pageTypeSlug: "temper-item-category-tree",
  slug: "siege-lancer",
  title: "Lancer",
  parent: "siege-equipment",
  displayOrder: 8,
  specializedItemTypes: [409],
} as const satisfies TemperItemCategoryTree
