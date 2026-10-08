import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const reagentHerbs = {
  id: "01a05fcf-f834-7a9b-8680-2ac4f03c887a",
  type: "page-type/temper-item-category-tree",
  slug: "reagent-herbs",
  title: "Herbs",
  parent: "temper-item-category-tree/reagents",
  displayOrder: 0,
  specializedItemTypes: [150],
  createdAt: "2026-09-02T01:51:00.148Z",
  updatedAt: "2026-09-22T20:49:49.000Z",
} as const satisfies TemperItemCategoryTree
