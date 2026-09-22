import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const jcRaw = {
  id: "01a05fcf-f824-7b31-978f-1b4480b01aef",
  type: "page-type/temper-item-category-tree",
  slug: "jc-raw",
  title: "Raw Materials",
  parent: "temper-item-category-tree/jewelry-crafting",
  displayOrder: 1,
  itemTypes: [63],
} as const satisfies TemperItemCategoryTree
