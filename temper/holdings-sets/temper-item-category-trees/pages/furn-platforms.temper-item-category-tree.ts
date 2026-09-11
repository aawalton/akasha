import type { TemperItemCategoryTree } from "akasha/temper/holdings-sets/temper-item-category-trees/temper-item-category-tree.page-type.types.ts"

export const furnPlatforms = {
  id: "01a05fcf-f808-7096-9ce4-44c3fd771373",
  type: "temper-item-category-tree",
  slug: "furn-platforms",
  title: "Platforms",
  parent: "furn-structures",
  displayOrder: 5,
  furnitureSubcategoryIds: [137],
} as const satisfies TemperItemCategoryTree
