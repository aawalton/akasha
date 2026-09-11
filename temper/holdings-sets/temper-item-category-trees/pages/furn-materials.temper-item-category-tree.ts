import type { TemperItemCategoryTree } from "akasha/temper/holdings-sets/temper-item-category-trees/temper-item-category-tree.page-type.types.ts"

export const furnMaterials = {
  id: "01a05fcf-f801-7e4c-aa97-46eacdf07a43",
  type: "temper-item-category-tree",
  slug: "furn-materials",
  title: "Materials",
  parent: "furn-workshop",
  displayOrder: 2,
  furnitureSubcategoryIds: [96],
} as const satisfies TemperItemCategoryTree
