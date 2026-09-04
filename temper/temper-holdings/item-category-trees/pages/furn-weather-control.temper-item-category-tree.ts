import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const furnWeatherControl = {
  id: "01a05fcf-f81b-7d9a-b703-70e664d2cc9b",
  pageTypeSlug: "temper-item-category-tree",
  slug: "furn-weather-control",
  title: "Weather Control",
  parent: "furn-services",
  displayOrder: 16,
  furnitureSubcategoryIds: [206],
} as const satisfies TemperItemCategoryTree
