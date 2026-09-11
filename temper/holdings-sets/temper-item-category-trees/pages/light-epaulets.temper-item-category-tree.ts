import type { TemperItemCategoryTree } from "akasha/temper/holdings-sets/temper-item-category-trees/temper-item-category-tree.page-type.types.ts"

export const lightEpaulets = {
  id: "01a05fcf-f827-7026-a23c-c4c0ead87666",
  type: "temper-item-category-tree",
  slug: "light-epaulets",
  title: "Epaulets",
  parent: "light-armor",
  displayOrder: 2,
  equipTypes: [4],
} as const satisfies TemperItemCategoryTree
