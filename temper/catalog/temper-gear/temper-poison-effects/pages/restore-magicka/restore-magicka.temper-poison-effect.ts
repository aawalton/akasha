import type { TemperPoisonEffect } from "akasha/temper/catalog/temper-gear/temper-poison-effects/temper-poison-effect.page-type.types.ts"

export const restoreMagicka = {
  id: "019e21f7-0f5a-7596-a05b-4941725bbbb6",
  type: "temper-poison-effect",
  slug: "restore-magicka",
  title: "Restore Magicka",
  key: "restore-magicka",
  oppositeId: "ravage-magicka",
  cooldown: 10,
  effects: "jsonl",
} as const satisfies TemperPoisonEffect
