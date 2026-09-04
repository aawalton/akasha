import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const furnBankingAssistants = {
  id: "01a05fcf-f7e6-761e-a45f-505774f1c368",
  pageTypeSlug: "temper-item-category-tree",
  slug: "furn-banking-assistants",
  title: "Banking Assistants",
  parent: "furn-services",
  displayOrder: 1,
  furnitureSubcategoryIds: [30],
} as const satisfies TemperItemCategoryTree
