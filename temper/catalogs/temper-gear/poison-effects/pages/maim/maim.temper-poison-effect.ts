import type { TemperPoisonEffect } from "../../temper-poison-effect.page-type.ts"

export const maim = {
  id: "019e21f7-0f6d-794e-abbd-a6ffd39e5ef4",
  pageTypeSlug: "temper-poison-effect",
  slug: "maim",
  title: "Maim",
  key: "maim",
  icon: "resources/crafting_alchemy_trait_lowerweaponpower.png",
  isPositive: false,
  oppositeId: "increase-weapon-power",
  effects: "jsonl",
} as const satisfies TemperPoisonEffect
