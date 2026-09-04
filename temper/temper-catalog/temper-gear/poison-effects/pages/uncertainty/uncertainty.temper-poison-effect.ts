import type { TemperPoisonEffect } from "../../temper-poison-effect.page-type.ts"

export const uncertainty = {
  id: "019e21f7-0f6f-7ad0-85d3-ac6bbe655d81",
  pageTypeSlug: "temper-poison-effect",
  slug: "uncertainty",
  title: "Uncertainty",
  key: "uncertainty",
  icon: "resources/crafting_alchemy_trait_lowerspellcrit.png",
  isPositive: false,
  oppositeId: "spell-critical",
  effects: "jsonl",
} as const satisfies TemperPoisonEffect
