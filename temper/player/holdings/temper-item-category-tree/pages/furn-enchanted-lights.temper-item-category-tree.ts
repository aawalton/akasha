import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnEnchantedLights = {
  id: "01a05fcf-f7f5-7f53-b6a9-51c9b64e414a",
  type: "page-type/temper-item-category-tree",
  slug: "furn-enchanted-lights",
  title: "Enchanted Lights",
  parent: "temper-item-category-tree/furn-lighting",
  displayOrder: 3,
  furnitureSubcategoryIds: [125],
} as const satisfies TemperItemCategoryTree
