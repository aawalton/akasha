import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnBankingAssistants = {
  id: "01a05fcf-f7e6-761e-a45f-505774f1c368",
  type: "page-type/temper-item-category-tree",
  slug: "furn-banking-assistants",
  title: "Banking Assistants",
  parent: "temper-item-category-tree/furn-services",
  displayOrder: 1,
  furnitureSubcategoryIds: [30],
  createdAt: "2026-09-02T01:51:00.070Z",
  updatedAt: "2026-09-22T20:49:49.000Z",
} as const satisfies TemperItemCategoryTree
