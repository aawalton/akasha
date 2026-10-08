import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const dagger = {
  id: "01a05fcf-f7d9-7477-9f09-207fb112a961",
  type: "page-type/temper-item-category-tree",
  slug: "dagger",
  title: "Dagger",
  parent: "temper-item-category-tree/one-handed",
  displayOrder: 3,
  weaponTypes: [11],
  createdAt: "2026-09-02T01:51:00.057Z",
  updatedAt: "2026-09-22T20:49:49.000Z",
} as const satisfies TemperItemCategoryTree
