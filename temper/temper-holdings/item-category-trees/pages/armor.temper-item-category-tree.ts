import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const armor = {
  id: "01a05fcf-f7bc-776c-96b0-33d346b903f5",
  pageTypeSlug: "temper-item-category-tree",
  slug: "armor",
  title: "Armor",
  parent: "equipment",
  displayOrder: 1,
  filterTypes: [2],
} as const satisfies TemperItemCategoryTree
