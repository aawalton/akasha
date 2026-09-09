import type { TemperPoisonEffect } from "../../temper-poison-effect.page-type.ts"

export const restoreStamina = {
  id: "019e21f7-0f5f-7afa-81bb-e7056a972eac",
  pageTypeSlug: "temper-poison-effect",
  slug: "restore-stamina",
  title: "Restore Stamina",
  key: "restore-stamina",
  oppositeId: "ravage-stamina",
  cooldown: 10,
  effects: "jsonl",
} as const satisfies TemperPoisonEffect
