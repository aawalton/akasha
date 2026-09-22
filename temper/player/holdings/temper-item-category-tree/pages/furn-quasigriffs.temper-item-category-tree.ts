import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnQuasigriffs = {
  id: "01a05fcf-f80a-73f0-8660-32b693670d26",
  type: "page-type/temper-item-category-tree",
  slug: "furn-quasigriffs",
  title: "Quasigriffs",
  parent: "temper-item-category-tree/furn-mounts",
  displayOrder: 14,
  furnitureSubcategoryIds: [212],
} as const satisfies TemperItemCategoryTree
