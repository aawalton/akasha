import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const dyeStamps = {
  id: "01a05fcf-f7de-712f-aca4-dedbe5f1a871",
  type: "page-type/temper-item-category-tree",
  slug: "dye-stamps",
  title: "Dye Stamps",
  parent: "temper-item-category-tree/appearance",
  displayOrder: 3,
  itemTypes: [59],
} as const satisfies TemperItemCategoryTree
