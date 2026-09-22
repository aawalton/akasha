import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const clothing = {
  id: "01a05fcf-f7c1-7784-ba9a-32bcb71a5e94",
  type: "page-type/temper-item-category-tree",
  slug: "clothing",
  title: "Clothing",
  parent: "temper-item-category-tree/crafting",
  displayOrder: 1,
} as const satisfies TemperItemCategoryTree
