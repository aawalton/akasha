import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnLightposts = {
  id: "01a05fcf-f7ff-7328-8124-00f1653a0de9",
  type: "page-type/temper-item-category-tree",
  slug: "furn-lightposts",
  title: "Lightposts",
  parent: "temper-item-category-tree/furn-lighting",
  displayOrder: 7,
  furnitureSubcategoryIds: [121],
} as const satisfies TemperItemCategoryTree
