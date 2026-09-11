import type { TemperItemCategoryTree } from "akasha/temper/holdings-sets/temper-item-category-trees/temper-item-category-tree.page-type.types.ts"

export const furnToys = {
  id: "01a05fcf-f815-7b8d-b654-55fe6f2dad02",
  type: "temper-item-category-tree",
  slug: "furn-toys",
  title: "Toys",
  parent: "furn-mounts",
  displayOrder: 19,
  furnitureSubcategoryIds: [195],
} as const satisfies TemperItemCategoryTree
