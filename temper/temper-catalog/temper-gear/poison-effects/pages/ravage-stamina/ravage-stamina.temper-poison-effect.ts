import type { TemperPoisonEffect } from "../../temper-poison-effect.page-type.ts"

export const ravageStamina = {
  id: "019e21f7-0f61-7f87-92c1-26e91cb96127",
  pageTypeSlug: "temper-poison-effect",
  slug: "ravage-stamina",
  title: "Ravage Stamina",
  key: "ravage-stamina",
  oppositeId: "restore-stamina",
  cooldown: 10,
  effects: "jsonl",
} as const satisfies TemperPoisonEffect
