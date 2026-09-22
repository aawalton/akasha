import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnMaterials = {
  id: "01a05fcf-f801-7e4c-aa97-46eacdf07a43",
  type: "page-type/temper-item-category-tree",
  slug: "furn-materials",
  title: "Materials",
  parent: "temper-item-category-tree/furn-workshop",
  displayOrder: 2,
  furnitureSubcategoryIds: [96],
} as const satisfies TemperItemCategoryTree
