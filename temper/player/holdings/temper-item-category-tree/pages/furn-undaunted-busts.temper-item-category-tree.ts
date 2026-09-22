import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnUndauntedBusts = {
  id: "01a05fcf-f817-7158-bd89-6b9fea4ad100",
  type: "page-type/temper-item-category-tree",
  slug: "furn-undaunted-busts",
  title: "Undaunted Busts",
  parent: "temper-item-category-tree/furn-gallery",
  displayOrder: 7,
  furnitureSubcategoryIds: [89],
} as const satisfies TemperItemCategoryTree
