import type { TemperBrowserCategory } from "akasha/temper/items/core/temper-browser-category/temper-browser-category.page-type.types.ts"

export const jewelryNecklace = {
  id: "01a0e10d-1b61-764d-bca8-3f68cc88422d",
  type: "page-type/temper-browser-category",
  slug: "jewelry-necklace",
  title: "Necklace",
  displayOrder: 2,
  match: "Jewelry",
  equipTypes: ["temper-equip-type/neck"],
  parent: "temper-browser-category/jewelry",
  createdAt: "2026-09-27T04:08:47.713Z",
  updatedAt: "2026-09-27T04:34:39.000Z",
} as const satisfies TemperBrowserCategory
