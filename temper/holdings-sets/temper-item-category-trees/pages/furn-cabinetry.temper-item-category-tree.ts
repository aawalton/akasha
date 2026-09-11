import type { TemperItemCategoryTree } from "akasha/temper/holdings-sets/temper-item-category-trees/temper-item-category-tree.page-type.types.ts"

export const furnCabinetry = {
  id: "01a05fcf-f7eb-7249-a2b3-d2d067bb9e8f",
  type: "temper-item-category-tree",
  slug: "furn-cabinetry",
  title: "Cabinetry",
  parent: "furn-hearth",
  displayOrder: 2,
  furnitureSubcategoryIds: [82],
} as const satisfies TemperItemCategoryTree
