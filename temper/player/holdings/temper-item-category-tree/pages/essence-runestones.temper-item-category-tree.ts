import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const essenceRunestones = {
  id: "01a05fcf-f7e0-744e-8423-766d45f36df6",
  type: "page-type/temper-item-category-tree",
  slug: "essence-runestones",
  title: "Essence Runestones",
  parent: "temper-item-category-tree/enchanting",
  displayOrder: 2,
  itemTypes: [53],
} as const satisfies TemperItemCategoryTree
