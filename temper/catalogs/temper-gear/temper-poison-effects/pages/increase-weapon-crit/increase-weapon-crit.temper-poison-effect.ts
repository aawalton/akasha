import type { TemperPoisonEffect } from "../../temper-poison-effect.page-type.ts"

export const increaseWeaponCrit = {
  id: "019e21f7-0f70-7d08-ad68-57e21591647b",
  pageTypeSlug: "temper-poison-effect",
  slug: "increase-weapon-crit",
  title: "Increase Weapon Crit",
  key: "increase-weapon-crit",
  icon: "resources/crafting_alchemy_trait_weaponcrit.png",
  isPositive: true,
  oppositeId: "enervation",
  effects: "jsonl",
} as const satisfies TemperPoisonEffect
