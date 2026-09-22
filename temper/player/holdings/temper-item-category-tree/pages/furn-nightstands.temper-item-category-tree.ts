import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnNightstands = {
  id: "01a05fcf-f805-7857-91c2-5dedd5b1bb82",
  type: "page-type/temper-item-category-tree",
  slug: "furn-nightstands",
  title: "Nightstands",
  parent: "temper-item-category-tree/furn-suite",
  displayOrder: 5,
  furnitureSubcategoryIds: [144],
} as const satisfies TemperItemCategoryTree
