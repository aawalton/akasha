import type { TemperItemCategoryTree } from "akasha/temper/holdings-sets/temper-item-category-trees/temper-item-category-tree.page-type.types.ts"

export const furnMounts = {
  id: "01a05fcf-f803-7da6-9d1b-711d77ae5419",
  type: "temper-item-category-tree",
  slug: "furn-mounts",
  title: "Mounts",
  parent: "furnishings",
  displayOrder: 13,
  furnitureCategoryIds: [15],
} as const satisfies TemperItemCategoryTree
