import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const maul = {
  id: "01a05fcf-f82a-73c1-a481-6157d0531377",
  type: "page-type/temper-item-category-tree",
  slug: "maul",
  title: "Maul",
  parent: "temper-item-category-tree/two-handed",
  displayOrder: 2,
  weaponTypes: [6],
} as const satisfies TemperItemCategoryTree
