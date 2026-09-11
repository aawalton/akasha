import type { TemperItemCategoryTree } from "akasha/temper/holdings-sets/temper-item-category-trees/temper-item-category-tree.page-type.types.ts"

export const furnTrunks = {
  id: "01a05fcf-f816-7687-8fbe-7c7ad6f2acec",
  type: "temper-item-category-tree",
  slug: "furn-trunks",
  title: "Trunks",
  parent: "furn-suite",
  displayOrder: 7,
  furnitureSubcategoryIds: [48],
} as const satisfies TemperItemCategoryTree
