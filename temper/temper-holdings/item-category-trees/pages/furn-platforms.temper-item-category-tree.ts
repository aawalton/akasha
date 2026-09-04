import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const furnPlatforms = {
  id: "01a05fcf-f808-7096-9ce4-44c3fd771373",
  pageTypeSlug: "temper-item-category-tree",
  slug: "furn-platforms",
  title: "Platforms",
  parent: "furn-structures",
  displayOrder: 5,
  furnitureSubcategoryIds: [137],
} as const satisfies TemperItemCategoryTree
