import type { TemperItemCategoryTree } from "akasha/temper/holdings-sets/temper-item-category-trees/temper-item-category-tree.page-type.types.ts"

export const furnWolves = {
  id: "01a05fcf-f81c-7a40-a57b-25f82db5a827",
  type: "temper-item-category-tree",
  slug: "furn-wolves",
  title: "Wolves",
  parent: "furn-mounts",
  displayOrder: 23,
  furnitureSubcategoryIds: [191],
} as const satisfies TemperItemCategoryTree
