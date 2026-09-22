import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnInstruments = {
  id: "01a05fcf-f7fc-796b-9041-a8c34e17bb2a",
  type: "page-type/temper-item-category-tree",
  slug: "furn-instruments",
  title: "Instruments",
  parent: "temper-item-category-tree/furn-parlor",
  displayOrder: 1,
  furnitureSubcategoryIds: [54],
} as const satisfies TemperItemCategoryTree
