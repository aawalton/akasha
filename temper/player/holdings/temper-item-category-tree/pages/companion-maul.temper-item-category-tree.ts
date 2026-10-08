import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const companionMaul = {
  id: "01a05fcf-f7cd-7673-9012-d33fdb37b7ea",
  type: "page-type/temper-item-category-tree",
  slug: "companion-maul",
  title: "Maul",
  parent: "temper-item-category-tree/companion-two-handed",
  displayOrder: 2,
  weaponTypes: [6],
  createdAt: "2026-09-02T01:51:00.045Z",
  updatedAt: "2026-09-22T20:49:49.000Z",
} as const satisfies TemperItemCategoryTree
