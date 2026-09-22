import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const knowledgeCollectibles = {
  id: "01a05fcf-f825-7843-884b-77d601f4b815",
  type: "page-type/temper-item-category-tree",
  slug: "knowledge-collectibles",
  title: "Collectibles",
  parent: "temper-item-category-tree/knowledge",
  displayOrder: 3,
} as const satisfies TemperItemCategoryTree
