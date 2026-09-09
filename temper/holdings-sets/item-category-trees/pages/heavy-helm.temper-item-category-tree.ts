import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const heavyHelm = {
  id: "01a05fcf-f820-7bde-8704-e95c52092262",
  pageTypeSlug: "temper-item-category-tree",
  slug: "heavy-helm",
  title: "Helm",
  parent: "heavy-armor",
  displayOrder: 0,
  equipTypes: [1],
} as const satisfies TemperItemCategoryTree
