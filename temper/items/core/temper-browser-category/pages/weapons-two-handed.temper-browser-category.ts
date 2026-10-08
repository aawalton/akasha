import type { TemperBrowserCategory } from "akasha/temper/items/core/temper-browser-category/temper-browser-category.page-type.types.ts"

export const weaponsTwoHanded = {
  id: "01a0e10d-1b61-7cfc-89c1-d30ee285e872",
  type: "page-type/temper-browser-category",
  slug: "weapons-two-handed",
  title: "Two-Handed",
  displayOrder: 3,
  match: "Weapons",
  weaponTypes: [
    "temper-weapon-type/battleaxe",
    "temper-weapon-type/maul",
    "temper-weapon-type/greatsword",
  ],
  parent: "temper-browser-category/weapons",
  createdAt: "2026-09-27T04:08:47.713Z",
  updatedAt: "2026-09-27T04:34:39.000Z",
} as const satisfies TemperBrowserCategory
