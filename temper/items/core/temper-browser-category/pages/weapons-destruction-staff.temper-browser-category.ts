import type { TemperBrowserCategory } from "akasha/temper/items/core/temper-browser-category/temper-browser-category.page-type.types.ts"

export const weaponsDestructionStaff = {
  id: "01a0e10d-1b61-72df-9e34-41aa473aa3c3",
  type: "page-type/temper-browser-category",
  slug: "weapons-destruction-staff",
  title: "Destruction Staff",
  displayOrder: 5,
  match: "Weapons",
  weaponTypes: [
    "temper-weapon-type/inferno-staff",
    "temper-weapon-type/ice-staff",
    "temper-weapon-type/lightning-staff",
  ],
  parent: "temper-browser-category/weapons",
} as const satisfies TemperBrowserCategory
