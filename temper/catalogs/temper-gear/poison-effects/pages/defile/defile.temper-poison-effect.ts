import type { TemperPoisonEffect } from "../../temper-poison-effect.page-type.ts"

export const defile = {
  id: "019e21f7-0f7c-7854-a0c1-63580dc90e94",
  pageTypeSlug: "temper-poison-effect",
  slug: "defile",
  title: "Defile",
  key: "defile",
  icon: "resources/crafting_poison_trait_decreasehealing.png",
  isPositive: false,
  oppositeId: "vitality",
  effects: "jsonl",
} as const satisfies TemperPoisonEffect
