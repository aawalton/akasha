import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const repairKits = {
  id: "01a05fcf-f838-74c3-b43c-0bffddb1bf25",
  type: "page-type/temper-item-category-tree",
  slug: "repair-kits",
  title: "Repair Kits",
  parent: "temper-item-category-tree/consumables",
  displayOrder: 6,
} as const satisfies TemperItemCategoryTree
