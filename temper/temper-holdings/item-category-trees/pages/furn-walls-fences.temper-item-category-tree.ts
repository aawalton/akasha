import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const furnWallsFences = {
  id: "01a05fcf-f81a-7f07-9d6e-a5367e573d07",
  pageTypeSlug: "temper-item-category-tree",
  slug: "furn-walls-fences",
  title: "Walls and Fences",
  parent: "furn-structures",
  displayOrder: 8,
  furnitureSubcategoryIds: [163],
} as const satisfies TemperItemCategoryTree
