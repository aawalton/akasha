import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const crownRepairKits = {
  id: "01a05fcf-f7d6-7346-b50a-afc3b7171fb1",
  type: "page-type/temper-item-category-tree",
  slug: "crown-repair-kits",
  title: "Crown Repair Kits",
  parent: "temper-item-category-tree/repair-kits",
  displayOrder: 1,
  itemTypes: [55],
} as const satisfies TemperItemCategoryTree
