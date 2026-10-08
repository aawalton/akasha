import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const axe = {
  id: "01a05fcf-f7bd-7e9c-be75-9b631a734101",
  type: "page-type/temper-item-category-tree",
  slug: "axe",
  title: "Axe",
  parent: "temper-item-category-tree/one-handed",
  displayOrder: 1,
  weaponTypes: [1],
  createdAt: "2026-09-02T01:51:00.029Z",
  updatedAt: "2026-09-22T20:49:49.000Z",
} as const satisfies TemperItemCategoryTree
