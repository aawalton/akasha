import type { TemperBrowserCategory } from "akasha/temper/items/core/temper-browser-category/temper-browser-category.page-type.types.ts"

export const weaponsBow = {
  id: "01a0e10d-1b61-782a-bfe8-a68ffe96b935",
  type: "page-type/temper-browser-category",
  slug: "weapons-bow",
  title: "Bow",
  displayOrder: 4,
  match: "Weapons",
  weaponTypes: ["temper-weapon-type/bow"],
  parent: "temper-browser-category/weapons",
  createdAt: "2026-09-27T04:08:47.713Z",
  updatedAt: "2026-09-27T04:34:39.000Z",
} as const satisfies TemperBrowserCategory
