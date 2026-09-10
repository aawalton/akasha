import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.types.ts"

export const furnMaterials = {
  id: "01a05fcf-f801-7e4c-aa97-46eacdf07a43",
  pageTypeSlug: "temper-item-category-tree",
  type: "temper-item-category-tree",
  slug: "furn-materials",
  title: "Materials",
  parent: "furn-workshop",
  displayOrder: 2,
  furnitureSubcategoryIds: [96],
} as const satisfies TemperItemCategoryTree
