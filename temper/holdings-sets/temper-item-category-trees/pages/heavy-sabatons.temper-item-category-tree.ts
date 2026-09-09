import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const heavySabatons = {
  id: "01a05fcf-f821-7e62-af98-21f8434945ac",
  pageTypeSlug: "temper-item-category-tree",
  slug: "heavy-sabatons",
  title: "Sabatons",
  parent: "heavy-armor",
  displayOrder: 6,
  equipTypes: [10],
} as const satisfies TemperItemCategoryTree
