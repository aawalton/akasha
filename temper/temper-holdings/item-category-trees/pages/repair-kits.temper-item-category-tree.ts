import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const repairKits = {
  id: "01a05fcf-f838-74c3-b43c-0bffddb1bf25",
  pageTypeSlug: "temper-item-category-tree",
  slug: "repair-kits",
  title: "Repair Kits",
  parent: "consumables",
  displayOrder: 6,
} as const satisfies TemperItemCategoryTree
