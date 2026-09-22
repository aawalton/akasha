import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const scribing = {
  id: "01a05fcf-f839-7eba-a54f-fdd1d824c685",
  type: "page-type/temper-item-category-tree",
  slug: "scribing",
  title: "Scribing",
  parent: "temper-item-category-tree/knowledge",
  displayOrder: 4,
} as const satisfies TemperItemCategoryTree
