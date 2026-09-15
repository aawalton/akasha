import type { TemperItemCategoryTree } from "akasha/temper/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const bow = {
  id: "01a05fcf-f7be-75ec-8931-2131f9240f1a",
  type: "page-type/temper-item-category-tree",
  slug: "bow",
  title: "Bow",
  parent: "weapons",
  displayOrder: 2,
  weaponTypes: [8],
} as const satisfies TemperItemCategoryTree
