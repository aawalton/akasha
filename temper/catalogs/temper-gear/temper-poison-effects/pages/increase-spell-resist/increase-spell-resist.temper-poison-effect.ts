import type { TemperPoisonEffect } from "../../temper-poison-effect.page-type.ts"

export const increaseSpellResist = {
  id: "019e21f7-0f63-77a6-86c5-d670efaa9f65",
  pageTypeSlug: "temper-poison-effect",
  slug: "increase-spell-resist",
  title: "Increase Spell Resistance",
  key: "increase-spell-resist",
  oppositeId: "breach",
  cooldown: 10,
  effects: "jsonl",
} as const satisfies TemperPoisonEffect
