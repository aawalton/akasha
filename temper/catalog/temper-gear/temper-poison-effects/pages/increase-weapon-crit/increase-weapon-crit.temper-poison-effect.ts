import type { TemperPoisonEffect } from "akasha/temper/catalog/temper-gear/temper-poison-effects/temper-poison-effect.page-type.types.ts"

export const increaseWeaponCrit = {
  id: "019e21f7-0f70-7d08-ad68-57e21591647b",
  type: "temper-poison-effect",
  slug: "increase-weapon-crit",
  title: "Increase Weapon Crit",
  key: "increase-weapon-crit",
  icon: "resources/crafting_alchemy_trait_weaponcrit.png",
  isPositive: true,
  oppositeId: "enervation",
  effects: "jsonl",
} as const satisfies TemperPoisonEffect
