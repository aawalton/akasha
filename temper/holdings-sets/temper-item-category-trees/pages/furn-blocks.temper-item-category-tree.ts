import type { TemperItemCategoryTree } from "akasha/temper/holdings-sets/temper-item-category-trees/temper-item-category-tree.page-type.types.ts"

export const furnBlocks = {
  id: "01a05fcf-f7e9-7c49-b19b-4f346e85dc80",
  type: "temper-item-category-tree",
  slug: "furn-blocks",
  title: "Blocks",
  parent: "furn-structures",
  displayOrder: 0,
  furnitureSubcategoryIds: [114],
} as const satisfies TemperItemCategoryTree
