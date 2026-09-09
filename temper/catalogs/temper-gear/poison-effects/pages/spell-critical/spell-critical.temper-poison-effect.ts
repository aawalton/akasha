import type { TemperPoisonEffect } from "../../temper-poison-effect.page-type.ts"

export const spellCritical = {
  id: "019e21f7-0f6e-7a42-931c-f0a5f1850ed0",
  pageTypeSlug: "temper-poison-effect",
  slug: "spell-critical",
  title: "Spell Critical",
  key: "spell-critical",
  icon: "resources/crafting_alchemy_trait_spellcrit.png",
  isPositive: true,
  oppositeId: "uncertainty",
  effects: "jsonl",
} as const satisfies TemperPoisonEffect
