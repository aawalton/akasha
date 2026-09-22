import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnWolves = {
  id: "01a05fcf-f81c-7a40-a57b-25f82db5a827",
  type: "page-type/temper-item-category-tree",
  slug: "furn-wolves",
  title: "Wolves",
  parent: "temper-item-category-tree/furn-mounts",
  displayOrder: 23,
  furnitureSubcategoryIds: [191],
} as const satisfies TemperItemCategoryTree
