import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const bow = {
  id: "01a05fcf-f7be-75ec-8931-2131f9240f1a",
  type: "page-type/temper-item-category-tree",
  slug: "bow",
  title: "Bow",
  parent: "temper-item-category-tree/weapons",
  displayOrder: 2,
  weaponTypes: [8],
  createdAt: "2026-09-02T01:51:00.030Z",
  updatedAt: "2026-09-22T20:49:49.000Z",
} as const satisfies TemperItemCategoryTree
