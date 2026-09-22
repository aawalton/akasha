import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const tributeClues = {
  id: "01a05fcf-f845-77da-bf92-6758186b7f63",
  type: "page-type/temper-item-category-tree",
  slug: "tribute-clues",
  title: "Tribute Clues",
  parent: "temper-item-category-tree/knowledge-collectibles",
  displayOrder: 4,
  specializedItemTypes: [113],
} as const satisfies TemperItemCategoryTree
