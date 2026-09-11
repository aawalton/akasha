import type { TemperItemCategoryTree } from "akasha/temper/holdings-sets/temper-item-category-trees/temper-item-category-tree.page-type.types.ts"

export const aspectRunestones = {
  id: "01a05fcf-f7bc-749b-a3d0-33afef947212",
  type: "temper-item-category-tree",
  slug: "aspect-runestones",
  title: "Aspect Runestones",
  parent: "enchanting",
  displayOrder: 3,
  itemTypes: [52],
} as const satisfies TemperItemCategoryTree
