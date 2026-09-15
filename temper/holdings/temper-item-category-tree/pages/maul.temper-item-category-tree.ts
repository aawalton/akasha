import type { TemperItemCategoryTree } from "akasha/temper/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const maul = {
  id: "01a05fcf-f82a-73c1-a481-6157d0531377",
  type: "page-type/temper-item-category-tree",
  slug: "maul",
  title: "Maul",
  parent: "two-handed",
  displayOrder: 2,
  weaponTypes: [6],
} as const satisfies TemperItemCategoryTree
