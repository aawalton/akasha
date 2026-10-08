import type { TemperBrowserCategory } from "akasha/temper/items/core/temper-browser-category/temper-browser-category.page-type.types.ts"

export const armorShield = {
  id: "01a0e10d-1b60-798f-9695-76ae5e136bca",
  type: "page-type/temper-browser-category",
  slug: "armor-shield",
  title: "Shield",
  displayOrder: 6,
  match: "Weapons",
  armorWeights: ["temper-armor-weight/shield"],
  parent: "temper-browser-category/armor",
  createdAt: "2026-09-27T04:08:47.712Z",
  updatedAt: "2026-09-27T04:34:39.000Z",
} as const satisfies TemperBrowserCategory
