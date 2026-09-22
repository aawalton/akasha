import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const containerUnopened = {
  id: "01a05fcf-f7d4-7adb-ad8b-5598fd0f7528",
  type: "page-type/temper-item-category-tree",
  slug: "container-unopened",
  title: "Unopened",
  parent: "temper-item-category-tree/containers",
  displayOrder: 5,
  itemTypes: [75],
} as const satisfies TemperItemCategoryTree
