import type { TemperPoisonEffect } from "../../temper-poison-effect.page-type.ts"

export const gradualRavageHealth = {
  id: "019e21f7-0f7a-7bb5-9a91-de88e791f918",
  pageTypeSlug: "temper-poison-effect",
  slug: "gradual-ravage-health",
  title: "Gradual Ravage Health",
  key: "gradual-ravage-health",
  icon: "resources/crafting_poison_trait_dot.png",
  isPositive: false,
  oppositeId: "lingering-health",
  effects: "jsonl",
} as const satisfies TemperPoisonEffect
