import type { Module } from "@akasha/code-system/module"

export const libSetsCoreApiArmorWeaponEquipClass = {
  id: "01a06231-8f1d-717e-ad62-dd5ee6472601",
  pageTypeSlug: "module",
  slug: "lib-sets-core-api-armor-weapon-equip-class",
  definition:
    "a set's armor, weapon and equip types, its worn piece count, its bonuses and its name",
  code: "ts",
  invariants: [
    {
      invariantKind: "gap",
      statement: "The answers here share no concern beyond taking a set as their subject.",
    },
  ],
} as const satisfies Module
