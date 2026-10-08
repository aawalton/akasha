import type { TemperBrowserCategory } from "akasha/temper/items/core/temper-browser-category/temper-browser-category.page-type.types.ts"

export const jewelryRing = {
  id: "01a0e10d-1b61-7a6b-9326-a243ac4dcaa2",
  type: "page-type/temper-browser-category",
  slug: "jewelry-ring",
  title: "Ring",
  displayOrder: 3,
  match: "Jewelry",
  equipTypes: ["temper-equip-type/ring"],
  parent: "temper-browser-category/jewelry",
  createdAt: "2026-09-27T04:08:47.713Z",
  updatedAt: "2026-09-27T04:34:39.000Z",
} as const satisfies TemperBrowserCategory
