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
} as const satisfies TemperBrowserCategory
