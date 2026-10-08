import type { TemperBrowserCategory } from "akasha/temper/items/core/temper-browser-category/temper-browser-category.page-type.types.ts"

export const weaponsHealingStaff = {
  id: "01a0e10d-1b61-7c83-84e0-dc3f9e279ad3",
  type: "page-type/temper-browser-category",
  slug: "weapons-healing-staff",
  title: "Healing Staff",
  displayOrder: 6,
  match: "Weapons",
  weaponTypes: ["temper-weapon-type/restoration-staff"],
  parent: "temper-browser-category/weapons",
  createdAt: "2026-09-27T04:08:47.713Z",
  updatedAt: "2026-09-27T04:34:39.000Z",
} as const satisfies TemperBrowserCategory
