import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnSencheRaht = {
  id: "01a05fcf-f80c-7ab9-b570-f777837bbb1b",
  type: "page-type/temper-item-category-tree",
  slug: "furn-senche-raht",
  title: "Senche-Raht",
  parent: "temper-item-category-tree/furn-mounts",
  displayOrder: 16,
  furnitureSubcategoryIds: [194],
} as const satisfies TemperItemCategoryTree
