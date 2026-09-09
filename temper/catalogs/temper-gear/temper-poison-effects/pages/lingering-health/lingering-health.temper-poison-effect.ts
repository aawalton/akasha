import type { TemperPoisonEffect } from "../../temper-poison-effect.page-type.ts"

export const lingeringHealth = {
  id: "019e21f7-0f79-7f1e-95b6-9ec56dbfc994",
  pageTypeSlug: "temper-poison-effect",
  slug: "lingering-health",
  title: "Lingering Health",
  key: "lingering-health",
  icon: "resources/crafting_poison_trait_hot.png",
  isPositive: true,
  oppositeId: "gradual-ravage-health",
  effects: "jsonl",
} as const satisfies TemperPoisonEffect
