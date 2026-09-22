import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const masterWrits = {
  id: "01a05fcf-f82a-72f2-9920-aafdfcddddd9",
  type: "page-type/temper-item-category-tree",
  slug: "master-writs",
  title: "Master Writs",
  parent: "temper-item-category-tree/tasks",
  displayOrder: 2,
  itemTypes: [60],
} as const satisfies TemperItemCategoryTree
