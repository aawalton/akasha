import type { TemperBrowserCategory } from "akasha/temper/items/core/temper-browser-category/temper-browser-category.page-type.types.ts"

export const companionWeapons = {
  id: "01a0e10d-1b60-7185-af64-d1b3d8380734",
  type: "page-type/temper-browser-category",
  slug: "companion-weapons",
  title: "Weapons",
  displayOrder: 2,
  match: "Companion",
  itemTypes: ["temper-item-type/weapon"],
  weaponTypes: [
    "temper-weapon-type/axe",
    "temper-weapon-type/mace",
    "temper-weapon-type/sword",
    "temper-weapon-type/dagger",
    "temper-weapon-type/battleaxe",
    "temper-weapon-type/maul",
    "temper-weapon-type/greatsword",
    "temper-weapon-type/bow",
    "temper-weapon-type/inferno-staff",
    "temper-weapon-type/ice-staff",
    "temper-weapon-type/lightning-staff",
    "temper-weapon-type/restoration-staff",
  ],
  parent: "temper-browser-category/companion",
} as const satisfies TemperBrowserCategory
