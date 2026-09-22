import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnDwemerSpiders = {
  id: "01a05fcf-f7f4-7e51-877a-bf9edac55d6c",
  type: "page-type/temper-item-category-tree",
  slug: "furn-dwemer-spiders",
  title: "Dwemer Spiders",
  parent: "temper-item-category-tree/furn-mounts",
  displayOrder: 6,
  furnitureSubcategoryIds: [193],
} as const satisfies TemperItemCategoryTree
