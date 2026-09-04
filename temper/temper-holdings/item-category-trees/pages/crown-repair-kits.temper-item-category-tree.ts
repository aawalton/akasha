import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const crownRepairKits = {
  id: "01a05fcf-f7d6-7346-b50a-afc3b7171fb1",
  pageTypeSlug: "temper-item-category-tree",
  slug: "crown-repair-kits",
  title: "Crown Repair Kits",
  parent: "repair-kits",
  displayOrder: 1,
  itemTypes: [55],
} as const satisfies TemperItemCategoryTree
