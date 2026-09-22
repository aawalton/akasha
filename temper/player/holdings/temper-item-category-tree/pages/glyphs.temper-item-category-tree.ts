import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const glyphs = {
  id: "01a05fcf-f81d-72a3-90ae-0a574bee4120",
  type: "page-type/temper-item-category-tree",
  slug: "glyphs",
  title: "Glyphs",
  parent: "temper-item-category-tree/consumables",
  displayOrder: 4,
  itemTypes: [3, 20, 21, 26],
} as const satisfies TemperItemCategoryTree
