import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const greatsword = {
  id: "01a05fcf-f81e-7e59-9636-2b0aaff61102",
  type: "page-type/temper-item-category-tree",
  slug: "greatsword",
  title: "Greatsword",
  parent: "temper-item-category-tree/two-handed",
  displayOrder: 0,
  weaponTypes: [4],
  createdAt: "2026-09-02T01:51:00.126Z",
  updatedAt: "2026-09-22T20:49:49.000Z",
} as const satisfies TemperItemCategoryTree
