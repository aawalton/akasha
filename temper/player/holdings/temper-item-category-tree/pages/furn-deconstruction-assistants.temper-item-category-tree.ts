import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnDeconstructionAssistants = {
  id: "01a05fcf-f7f0-7af3-baaa-57d9e4d418bf",
  type: "page-type/temper-item-category-tree",
  slug: "furn-deconstruction-assistants",
  title: "Deconstruction Assistants",
  parent: "temper-item-category-tree/furn-services",
  displayOrder: 3,
  furnitureSubcategoryIds: [200],
  createdAt: "2026-09-02T01:51:00.080Z",
  updatedAt: "2026-09-22T20:49:49.000Z",
} as const satisfies TemperItemCategoryTree
