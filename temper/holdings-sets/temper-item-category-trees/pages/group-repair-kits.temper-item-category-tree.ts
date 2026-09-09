import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const groupRepairKits = {
  id: "01a05fcf-f81e-7a79-a87e-7098e36151e3",
  pageTypeSlug: "temper-item-category-tree",
  slug: "group-repair-kits",
  title: "Group Repair Kits",
  parent: "repair-kits",
  displayOrder: 2,
  itemTypes: [71],
} as const satisfies TemperItemCategoryTree
