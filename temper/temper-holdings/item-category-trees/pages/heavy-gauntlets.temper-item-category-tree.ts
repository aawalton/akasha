import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const heavyGauntlets = {
  id: "01a05fcf-f81f-76cb-aa72-41d5a5715bbb",
  pageTypeSlug: "temper-item-category-tree",
  slug: "heavy-gauntlets",
  title: "Gauntlets",
  parent: "heavy-armor",
  displayOrder: 3,
  equipTypes: [13],
} as const satisfies TemperItemCategoryTree
