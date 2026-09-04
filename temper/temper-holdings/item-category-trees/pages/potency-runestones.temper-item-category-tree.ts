import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const potencyRunestones = {
  id: "01a05fcf-f831-709f-93b8-f0dbdee3f85c",
  pageTypeSlug: "temper-item-category-tree",
  slug: "potency-runestones",
  title: "Potency Runestones",
  parent: "enchanting",
  displayOrder: 1,
  itemTypes: [51],
} as const satisfies TemperItemCategoryTree
