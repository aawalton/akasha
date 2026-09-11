import type { TemperItemCategoryTree } from "akasha/temper/holdings-sets/temper-item-category-trees/temper-item-category-tree.page-type.types.ts"

export const knowledgeCollectibles = {
  id: "01a05fcf-f825-7843-884b-77d601f4b815",
  type: "temper-item-category-tree",
  slug: "knowledge-collectibles",
  title: "Collectibles",
  parent: "knowledge",
  displayOrder: 3,
} as const satisfies TemperItemCategoryTree
