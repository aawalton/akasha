import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const heavyHelm = {
  id: "01a05fcf-f820-7bde-8704-e95c52092262",
  type: "page-type/temper-item-category-tree",
  slug: "heavy-helm",
  title: "Helm",
  parent: "temper-item-category-tree/heavy-armor",
  displayOrder: 0,
  equipTypes: [1],
} as const satisfies TemperItemCategoryTree
