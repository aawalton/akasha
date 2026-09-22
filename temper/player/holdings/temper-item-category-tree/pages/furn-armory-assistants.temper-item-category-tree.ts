import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnArmoryAssistants = {
  id: "01a05fcf-f7e5-744a-90d6-5b7934d21dfc",
  type: "page-type/temper-item-category-tree",
  slug: "furn-armory-assistants",
  title: "Armory Assistants",
  parent: "temper-item-category-tree/furn-services",
  displayOrder: 0,
  furnitureSubcategoryIds: [199],
} as const satisfies TemperItemCategoryTree
