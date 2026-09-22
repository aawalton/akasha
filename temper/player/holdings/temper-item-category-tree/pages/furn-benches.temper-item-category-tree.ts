import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnBenches = {
  id: "01a05fcf-f7e8-7cd2-bccb-16ad1c19b29e",
  type: "page-type/temper-item-category-tree",
  slug: "furn-benches",
  title: "Benches",
  parent: "temper-item-category-tree/furn-dining",
  displayOrder: 0,
  furnitureSubcategoryIds: [133],
} as const satisfies TemperItemCategoryTree
