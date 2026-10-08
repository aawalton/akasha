import type { TemperBrowserCategory } from "akasha/temper/items/core/temper-browser-category/temper-browser-category.page-type.types.ts"

export const companionShield = {
  id: "01a0e10d-1b60-7f1f-a9e1-07bbeae6b18d",
  type: "page-type/temper-browser-category",
  slug: "companion-shield",
  title: "Shield",
  displayOrder: 5,
  match: "Companion",
  itemTypes: ["temper-item-type/weapon"],
  armorWeights: ["temper-armor-weight/shield"],
  parent: "temper-browser-category/companion",
  createdAt: "2026-09-27T04:08:47.712Z",
  updatedAt: "2026-09-27T04:34:39.000Z",
} as const satisfies TemperBrowserCategory
