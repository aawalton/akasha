import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const furnUndauntedTrophies = {
  id: "01a05fcf-f817-711e-acbf-3d84bcae6d01",
  pageTypeSlug: "temper-item-category-tree",
  slug: "furn-undaunted-trophies",
  title: "Undaunted Trophies",
  parent: "furn-gallery",
  displayOrder: 8,
  furnitureSubcategoryIds: [156],
} as const satisfies TemperItemCategoryTree
