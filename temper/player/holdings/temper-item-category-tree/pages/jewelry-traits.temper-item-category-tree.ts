import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const jewelryTraits = {
  id: "01a05fcf-f824-7f1e-9387-75590324d191",
  type: "page-type/temper-item-category-tree",
  slug: "jewelry-traits",
  title: "Jewelry Traits",
  parent: "temper-item-category-tree/trait-items",
  displayOrder: 2,
  itemTypes: [66],
} as const satisfies TemperItemCategoryTree
