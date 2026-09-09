import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const scrolls = {
  id: "01a05fcf-f83b-78ec-88c9-71ce9addceec",
  pageTypeSlug: "temper-item-category-tree",
  slug: "scrolls",
  title: "Scrolls",
  parent: "consumables",
  displayOrder: 9,
  specializedItemTypes: [105],
} as const satisfies TemperItemCategoryTree
