import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const heavyCuirass = {
  id: "01a05fcf-f81f-7d76-8b16-970e5d0aa2fd",
  type: "page-type/temper-item-category-tree",
  slug: "heavy-cuirass",
  title: "Cuirass",
  parent: "temper-item-category-tree/heavy-armor",
  displayOrder: 1,
  equipTypes: [3],
} as const satisfies TemperItemCategoryTree
