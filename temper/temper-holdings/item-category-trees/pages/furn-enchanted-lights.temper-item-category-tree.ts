import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const furnEnchantedLights = {
  id: "01a05fcf-f7f5-7f53-b6a9-51c9b64e414a",
  pageTypeSlug: "temper-item-category-tree",
  slug: "furn-enchanted-lights",
  title: "Enchanted Lights",
  parent: "furn-lighting",
  displayOrder: 3,
  furnitureSubcategoryIds: [125],
} as const satisfies TemperItemCategoryTree
