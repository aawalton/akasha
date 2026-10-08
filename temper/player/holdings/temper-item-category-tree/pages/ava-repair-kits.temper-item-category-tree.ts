import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const avaRepairKits = {
  id: "01a05fcf-f7bd-7ff3-be59-f310374cffdf",
  type: "page-type/temper-item-category-tree",
  slug: "ava-repair-kits",
  title: "Repair Kits",
  parent: "temper-item-category-tree/alliance-war",
  displayOrder: 1,
  itemTypes: [47],
  createdAt: "2026-09-02T01:51:00.029Z",
  updatedAt: "2026-09-22T20:49:49.000Z",
} as const satisfies TemperItemCategoryTree
