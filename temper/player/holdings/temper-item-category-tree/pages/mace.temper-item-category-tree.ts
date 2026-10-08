import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const mace = {
  id: "01a05fcf-f82a-7721-ac93-f75a3cceb0ba",
  type: "page-type/temper-item-category-tree",
  slug: "mace",
  title: "Mace",
  parent: "temper-item-category-tree/one-handed",
  displayOrder: 2,
  weaponTypes: [2],
  createdAt: "2026-09-02T01:51:00.138Z",
  updatedAt: "2026-09-22T20:49:49.000Z",
} as const satisfies TemperItemCategoryTree
