import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnSofasCouches = {
  id: "01a05fcf-f80e-777a-bfe7-99a1d6993c9a",
  type: "page-type/temper-item-category-tree",
  slug: "furn-sofas-couches",
  title: "Sofas and Couches",
  parent: "temper-item-category-tree/furn-parlor",
  displayOrder: 4,
  furnitureSubcategoryIds: [132],
} as const satisfies TemperItemCategoryTree
