import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const lightBreeches = {
  id: "01a05fcf-f826-7184-b53d-bb130bc1c7ad",
  pageTypeSlug: "temper-item-category-tree",
  slug: "light-breeches",
  title: "Breeches",
  parent: "light-armor",
  displayOrder: 5,
  equipTypes: [9],
} as const satisfies TemperItemCategoryTree
