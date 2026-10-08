import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const skillScrolls = {
  id: "01a05fcf-f83f-7dfa-90a1-0731f2897aa0",
  type: "page-type/temper-item-category-tree",
  slug: "skill-scrolls",
  title: "Skill Scrolls",
  parent: "temper-item-category-tree/consumables",
  displayOrder: 10,
  itemTypes: [76],
  createdAt: "2026-09-02T01:51:00.159Z",
  updatedAt: "2026-09-22T20:49:49.000Z",
} as const satisfies TemperItemCategoryTree
