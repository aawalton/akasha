import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const wwResins = {
  id: "01a05fcf-f84a-7b62-bbd9-f7527c97d9c6",
  type: "page-type/temper-item-category-tree",
  slug: "ww-resins",
  title: "Resins",
  parent: "temper-item-category-tree/woodworking",
  displayOrder: 3,
  itemTypes: [42],
} as const satisfies TemperItemCategoryTree
