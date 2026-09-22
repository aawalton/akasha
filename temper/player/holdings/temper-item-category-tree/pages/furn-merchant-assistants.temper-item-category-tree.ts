import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnMerchantAssistants = {
  id: "01a05fcf-f802-742e-92d7-347b06f10381",
  type: "page-type/temper-item-category-tree",
  slug: "furn-merchant-assistants",
  title: "Merchant Assistants",
  parent: "temper-item-category-tree/furn-services",
  displayOrder: 6,
  furnitureSubcategoryIds: [31],
} as const satisfies TemperItemCategoryTree
