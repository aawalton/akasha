import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const containerStylePage = {
  id: "01a05fcf-f7d4-7b74-91f8-0b25e7152d79",
  type: "page-type/temper-item-category-tree",
  slug: "container-style-page",
  title: "Style Page",
  parent: "temper-item-category-tree/containers",
  displayOrder: 4,
  specializedItemTypes: [852],
} as const satisfies TemperItemCategoryTree
