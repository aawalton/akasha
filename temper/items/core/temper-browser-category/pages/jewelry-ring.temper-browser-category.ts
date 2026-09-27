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
} as const satisfies TemperBrowserCategory
