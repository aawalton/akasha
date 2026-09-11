import type { TemperItemCategoryTree } from "akasha/temper/holdings-sets/temper-item-category-trees/temper-item-category-tree.page-type.types.ts"

export const furnStonesPebbles = {
  id: "01a05fcf-f810-7e3a-9a7c-b24967a85ab7",
  type: "temper-item-category-tree",
  slug: "furn-stones-pebbles",
  title: "Stones and Pebbles",
  parent: "furn-conservatory",
  displayOrder: 13,
  furnitureSubcategoryIds: [135],
} as const satisfies TemperItemCategoryTree
