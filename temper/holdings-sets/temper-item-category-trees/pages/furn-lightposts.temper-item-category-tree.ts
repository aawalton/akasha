import type { TemperItemCategoryTree } from "akasha/temper/holdings-sets/temper-item-category-trees/temper-item-category-tree.page-type.types.ts"

export const furnLightposts = {
  id: "01a05fcf-f7ff-7328-8124-00f1653a0de9",
  type: "temper-item-category-tree",
  slug: "furn-lightposts",
  title: "Lightposts",
  parent: "furn-lighting",
  displayOrder: 7,
  furnitureSubcategoryIds: [121],
} as const satisfies TemperItemCategoryTree
