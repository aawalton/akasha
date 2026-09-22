import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnTharrikers = {
  id: "01a05fcf-f813-7cf1-b4c3-c24939269728",
  type: "page-type/temper-item-category-tree",
  slug: "furn-tharrikers",
  title: "Tharrikers",
  parent: "temper-item-category-tree/furn-mounts",
  displayOrder: 18,
  furnitureSubcategoryIds: [215],
} as const satisfies TemperItemCategoryTree
