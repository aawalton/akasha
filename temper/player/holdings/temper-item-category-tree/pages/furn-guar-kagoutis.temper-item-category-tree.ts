import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnGuarKagoutis = {
  id: "01a05fcf-f7fa-7d2c-9ccd-1ef4d7e5a560",
  type: "page-type/temper-item-category-tree",
  slug: "furn-guar-kagoutis",
  title: "Guar & Kagoutis",
  parent: "temper-item-category-tree/furn-mounts",
  displayOrder: 8,
  furnitureSubcategoryIds: [177],
} as const satisfies TemperItemCategoryTree
