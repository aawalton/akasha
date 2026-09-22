import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnUndauntedTrophies = {
  id: "01a05fcf-f817-711e-acbf-3d84bcae6d01",
  type: "page-type/temper-item-category-tree",
  slug: "furn-undaunted-trophies",
  title: "Undaunted Trophies",
  parent: "temper-item-category-tree/furn-gallery",
  displayOrder: 8,
  furnitureSubcategoryIds: [156],
} as const satisfies TemperItemCategoryTree
