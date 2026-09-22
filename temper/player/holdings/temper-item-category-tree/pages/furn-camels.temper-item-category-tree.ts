import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnCamels = {
  id: "01a05fcf-f7ec-7054-ba7c-965c58f25e56",
  type: "page-type/temper-item-category-tree",
  slug: "furn-camels",
  title: "Camels",
  parent: "temper-item-category-tree/furn-mounts",
  displayOrder: 3,
  furnitureSubcategoryIds: [178],
} as const satisfies TemperItemCategoryTree
