import type { TemperBrowserCategory } from "akasha/temper/items/core/temper-browser-category/temper-browser-category.page-type.types.ts"

export const weaponsOneHanded = {
  id: "01a0e10d-1b61-71cc-af43-68d45fc255aa",
  type: "page-type/temper-browser-category",
  slug: "weapons-one-handed",
  title: "One-Handed",
  displayOrder: 2,
  match: "Weapons",
  weaponTypes: [
    "temper-weapon-type/axe",
    "temper-weapon-type/mace",
    "temper-weapon-type/sword",
    "temper-weapon-type/dagger",
  ],
  parent: "temper-browser-category/weapons",
  createdAt: "2026-09-27T04:08:47.713Z",
  updatedAt: "2026-09-27T04:34:39.000Z",
} as const satisfies TemperBrowserCategory
