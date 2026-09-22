import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const provisioning = {
  id: "01a05fcf-f832-79c5-947a-6f41873bf4b5",
  type: "page-type/temper-item-category-tree",
  slug: "provisioning",
  title: "Provisioning",
  parent: "temper-item-category-tree/crafting",
  displayOrder: 6,
} as const satisfies TemperItemCategoryTree
