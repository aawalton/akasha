import type { TemperPoisonEffect } from "akasha/temper/catalog/temper-gear/temper-poison-effects/temper-poison-effect.page-type.types.ts"

export const cowardice = {
  id: "019e21f7-0f6b-7703-9110-bdf64a6df8de",
  type: "temper-poison-effect",
  slug: "cowardice",
  title: "Cowardice",
  key: "cowardice",
  icon: "resources/crafting_alchemy_trait_lowerspellpower.png",
  isPositive: false,
  oppositeId: "increase-spell-power",
  effects: "jsonl",
} as const satisfies TemperPoisonEffect
