import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const containerOther = {
  id: "01a05fcf-f7d3-7d1b-ac79-9bd51588cab6",
  type: "page-type/temper-item-category-tree",
  slug: "container-other",
  title: "Other",
  parent: "temper-item-category-tree/containers",
  displayOrder: 7,
  itemTypes: [18],
} as const satisfies TemperItemCategoryTree
