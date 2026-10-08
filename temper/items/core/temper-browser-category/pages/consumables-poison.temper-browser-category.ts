import type { TemperBrowserCategory } from "akasha/temper/items/core/temper-browser-category/temper-browser-category.page-type.types.ts"

export const consumablesPoison = {
  id: "01a0e10d-1b61-7757-b94d-883bb5b4901e",
  type: "page-type/temper-browser-category",
  slug: "consumables-poison",
  title: "Poison",
  displayOrder: 6,
  match: "Consumable",
  itemTypes: ["temper-item-type/poison"],
  parent: "temper-browser-category/consumables",
  createdAt: "2026-09-27T04:08:47.713Z",
  updatedAt: "2026-09-27T04:34:39.000Z",
} as const satisfies TemperBrowserCategory
