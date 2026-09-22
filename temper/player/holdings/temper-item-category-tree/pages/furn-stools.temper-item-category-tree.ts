import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnStools = {
  id: "01a05fcf-f810-775a-bb8c-dd2117c65348",
  type: "page-type/temper-item-category-tree",
  slug: "furn-stools",
  title: "Stools",
  parent: "temper-item-category-tree/furn-workshop",
  displayOrder: 4,
  furnitureSubcategoryIds: [134],
} as const satisfies TemperItemCategoryTree
