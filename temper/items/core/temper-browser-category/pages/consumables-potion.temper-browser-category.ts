import type { TemperBrowserCategory } from "akasha/temper/items/core/temper-browser-category/temper-browser-category.page-type.types.ts"

export const consumablesPotion = {
  id: "01a0e10d-1b61-7d6a-937e-ec82328c5061",
  type: "page-type/temper-browser-category",
  slug: "consumables-potion",
  title: "Potion",
  displayOrder: 5,
  match: "Consumable",
  itemTypes: ["temper-item-type/potion"],
  parent: "temper-browser-category/consumables",
} as const satisfies TemperBrowserCategory
