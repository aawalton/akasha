import type { TemperItemCategoryTree } from "akasha/temper/holdings-sets/temper-item-category-trees/temper-item-category-tree.page-type.types.ts"

export const containerOther = {
  id: "01a05fcf-f7d3-7d1b-ac79-9bd51588cab6",
  type: "temper-item-category-tree",
  slug: "container-other",
  title: "Other",
  parent: "containers",
  displayOrder: 7,
  itemTypes: [18],
} as const satisfies TemperItemCategoryTree
