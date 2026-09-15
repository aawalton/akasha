import type { TemperItemCategoryTree } from "akasha/temper/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnMirrors = {
  id: "01a05fcf-f802-7ebf-8098-36021adb60bc",
  type: "page-type/temper-item-category-tree",
  slug: "furn-mirrors",
  title: "Mirrors",
  parent: "furn-suite",
  displayOrder: 4,
  furnitureSubcategoryIds: [49],
} as const satisfies TemperItemCategoryTree
