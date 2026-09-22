import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const scriptAffix = {
  id: "01a05fcf-f83a-7f9c-be37-dc470ef45ed6",
  type: "page-type/temper-item-category-tree",
  slug: "script-affix",
  title: "Affix",
  parent: "temper-item-category-tree/scripts",
  displayOrder: 2,
  specializedItemTypes: [3252],
} as const satisfies TemperItemCategoryTree
