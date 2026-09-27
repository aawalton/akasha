import type { TemperBrowserCategory } from "akasha/temper/items/core/temper-browser-category/temper-browser-category.page-type.types.ts"

export const consumablesMotif = {
  id: "01a0e10d-1b61-7184-a1db-cd72d66eb74b",
  type: "page-type/temper-browser-category",
  slug: "consumables-motif",
  title: "Motif",
  displayOrder: 7,
  match: "Consumable",
  itemTypes: ["temper-item-type/racial-style-motif"],
  parent: "temper-browser-category/consumables",
} as const satisfies TemperBrowserCategory
