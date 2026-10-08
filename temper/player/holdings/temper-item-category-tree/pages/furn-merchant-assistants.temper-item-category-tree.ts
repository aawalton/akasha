import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnMerchantAssistants = {
  id: "01a05fcf-f802-742e-92d7-347b06f10381",
  type: "page-type/temper-item-category-tree",
  slug: "furn-merchant-assistants",
  title: "Merchant Assistants",
  parent: "temper-item-category-tree/furn-services",
  displayOrder: 6,
  furnitureSubcategoryIds: [31],
  createdAt: "2026-09-02T01:51:00.098Z",
  updatedAt: "2026-09-22T20:49:49.000Z",
} as const satisfies TemperItemCategoryTree
