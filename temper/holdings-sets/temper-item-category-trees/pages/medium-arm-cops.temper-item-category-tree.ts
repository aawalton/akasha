import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.types.ts"

export const mediumArmCops = {
  id: "01a05fcf-f82a-79f5-adcb-29b79a534d43",
  pageTypeSlug: "temper-item-category-tree",
  type: "temper-item-category-tree",
  slug: "medium-arm-cops",
  title: "Arm Cops",
  parent: "medium-armor",
  displayOrder: 2,
  equipTypes: [4],
} as const satisfies TemperItemCategoryTree
