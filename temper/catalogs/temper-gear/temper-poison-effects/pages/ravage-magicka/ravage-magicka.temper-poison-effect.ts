import type { TemperPoisonEffect } from "../../temper-poison-effect.page-type.ts"

export const ravageMagicka = {
  id: "019e21f7-0f5c-7f12-a7c0-9e4d51f2c0c2",
  pageTypeSlug: "temper-poison-effect",
  slug: "ravage-magicka",
  title: "Ravage Magicka",
  key: "ravage-magicka",
  oppositeId: "restore-magicka",
  cooldown: 10,
  effects: "jsonl",
} as const satisfies TemperPoisonEffect
