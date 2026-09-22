import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const lightHat = {
  id: "01a05fcf-f827-72d4-9673-8785e7a83556",
  type: "page-type/temper-item-category-tree",
  slug: "light-hat",
  title: "Hat",
  parent: "temper-item-category-tree/light-armor",
  displayOrder: 0,
  equipTypes: [1],
} as const satisfies TemperItemCategoryTree
