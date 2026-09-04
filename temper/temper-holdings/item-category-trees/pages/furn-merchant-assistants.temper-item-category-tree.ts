import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const furnMerchantAssistants = {
  id: "01a05fcf-f802-742e-92d7-347b06f10381",
  pageTypeSlug: "temper-item-category-tree",
  slug: "furn-merchant-assistants",
  title: "Merchant Assistants",
  parent: "furn-services",
  displayOrder: 6,
  furnitureSubcategoryIds: [31],
} as const satisfies TemperItemCategoryTree
