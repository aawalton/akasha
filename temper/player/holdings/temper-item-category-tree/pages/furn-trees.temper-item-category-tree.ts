import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnTrees = {
  id: "01a05fcf-f816-79ed-8d92-46751cf097ef",
  type: "page-type/temper-item-category-tree",
  slug: "furn-trees",
  title: "Trees",
  parent: "temper-item-category-tree/furn-conservatory",
  displayOrder: 14,
  furnitureSubcategoryIds: [107],
} as const satisfies TemperItemCategoryTree
