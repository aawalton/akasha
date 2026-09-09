import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const masterWrits = {
  id: "01a05fcf-f82a-72f2-9920-aafdfcddddd9",
  pageTypeSlug: "temper-item-category-tree",
  slug: "master-writs",
  title: "Master Writs",
  parent: "tasks",
  displayOrder: 2,
  itemTypes: [60],
} as const satisfies TemperItemCategoryTree
