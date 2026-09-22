import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnUrsauks = {
  id: "01a05fcf-f818-729e-9e57-a7d6fa731c18",
  type: "page-type/temper-item-category-tree",
  slug: "furn-ursauks",
  title: "Ursauks",
  parent: "temper-item-category-tree/furn-mounts",
  displayOrder: 20,
  furnitureSubcategoryIds: [214],
} as const satisfies TemperItemCategoryTree
