import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const furnDwemerSpiders = {
  id: "01a05fcf-f7f4-7e51-877a-bf9edac55d6c",
  pageTypeSlug: "temper-item-category-tree",
  slug: "furn-dwemer-spiders",
  title: "Dwemer Spiders",
  parent: "furn-mounts",
  displayOrder: 6,
  furnitureSubcategoryIds: [193],
} as const satisfies TemperItemCategoryTree
