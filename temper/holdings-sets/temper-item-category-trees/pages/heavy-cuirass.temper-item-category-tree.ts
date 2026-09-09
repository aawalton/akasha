import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const heavyCuirass = {
  id: "01a05fcf-f81f-7d76-8b16-970e5d0aa2fd",
  pageTypeSlug: "temper-item-category-tree",
  slug: "heavy-cuirass",
  title: "Cuirass",
  parent: "heavy-armor",
  displayOrder: 1,
  equipTypes: [3],
} as const satisfies TemperItemCategoryTree
