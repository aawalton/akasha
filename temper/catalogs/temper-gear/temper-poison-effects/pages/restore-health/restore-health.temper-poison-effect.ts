import type { TemperPoisonEffect } from "../../temper-poison-effect.page-type.ts"

export const restoreHealth = {
  id: "019e21f7-0f55-711f-bf44-92d60627ffe6",
  pageTypeSlug: "temper-poison-effect",
  slug: "restore-health",
  title: "Restore Health",
  key: "restore-health",
  oppositeId: "ravage-health",
  cooldown: 10,
  effects: "jsonl",
} as const satisfies TemperPoisonEffect
