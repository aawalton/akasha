import type { TemperPoisonEffect } from "akasha/temper/catalog/temper-gear/temper-poison-effects/temper-poison-effect.page-type.types.ts"

export const vitality = {
  id: "019e21f7-0f7b-7a1e-9c4d-3e7027222d9e",
  type: "temper-poison-effect",
  slug: "vitality",
  title: "Vitality",
  key: "vitality",
  icon: "resources/crafting_poison_trait_increasehealing.png",
  isPositive: true,
  oppositeId: "defile",
  effects: "jsonl",
} as const satisfies TemperPoisonEffect
