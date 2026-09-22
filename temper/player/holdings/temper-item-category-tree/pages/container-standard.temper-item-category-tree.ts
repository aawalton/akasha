import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const containerStandard = {
  id: "01a05fcf-f7d4-7449-b6b0-842e2895a722",
  type: "page-type/temper-item-category-tree",
  slug: "container-standard",
  title: "Standard",
  parent: "temper-item-category-tree/containers",
  displayOrder: 0,
  specializedItemTypes: [850],
} as const satisfies TemperItemCategoryTree
