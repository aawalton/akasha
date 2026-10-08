import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const companionMace = {
  id: "01a05fcf-f7cc-70d4-a7e7-46d06dce780e",
  type: "page-type/temper-item-category-tree",
  slug: "companion-mace",
  title: "Mace",
  parent: "temper-item-category-tree/companion-one-handed",
  displayOrder: 2,
  weaponTypes: [2],
  createdAt: "2026-09-02T01:51:00.044Z",
  updatedAt: "2026-09-22T20:49:49.000Z",
} as const satisfies TemperItemCategoryTree
