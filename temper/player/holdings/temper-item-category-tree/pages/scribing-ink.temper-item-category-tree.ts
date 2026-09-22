import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const scribingInk = {
  id: "01a05fcf-f839-73dd-90bd-1fe7a4f9bef8",
  type: "page-type/temper-item-category-tree",
  slug: "scribing-ink",
  title: "Scribing Ink",
  parent: "temper-item-category-tree/crafting",
  displayOrder: 9,
  itemTypes: [74],
} as const satisfies TemperItemCategoryTree
