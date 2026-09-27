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
} as const satisfies TemperBrowserCategory
