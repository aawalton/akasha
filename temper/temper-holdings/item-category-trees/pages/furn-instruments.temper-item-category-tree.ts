import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const furnInstruments = {
  id: "01a05fcf-f7fc-796b-9041-a8c34e17bb2a",
  pageTypeSlug: "temper-item-category-tree",
  slug: "furn-instruments",
  title: "Instruments",
  parent: "furn-parlor",
  displayOrder: 1,
  furnitureSubcategoryIds: [54],
} as const satisfies TemperItemCategoryTree
