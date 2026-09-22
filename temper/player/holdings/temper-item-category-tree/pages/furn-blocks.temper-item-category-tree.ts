import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnBlocks = {
  id: "01a05fcf-f7e9-7c49-b19b-4f346e85dc80",
  type: "page-type/temper-item-category-tree",
  slug: "furn-blocks",
  title: "Blocks",
  parent: "temper-item-category-tree/furn-structures",
  displayOrder: 0,
  furnitureSubcategoryIds: [114],
} as const satisfies TemperItemCategoryTree
