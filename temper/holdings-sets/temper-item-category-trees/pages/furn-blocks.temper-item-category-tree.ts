import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const furnBlocks = {
  id: "01a05fcf-f7e9-7c49-b19b-4f346e85dc80",
  pageTypeSlug: "temper-item-category-tree",
  slug: "furn-blocks",
  title: "Blocks",
  parent: "furn-structures",
  displayOrder: 0,
  furnitureSubcategoryIds: [114],
} as const satisfies TemperItemCategoryTree
