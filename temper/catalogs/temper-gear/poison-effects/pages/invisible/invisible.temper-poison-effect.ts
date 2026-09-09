import type { TemperPoisonEffect } from "../../temper-poison-effect.page-type.ts"

export const invisible = {
  id: "019e21f7-0f75-7ecc-b654-68dde11b0d1e",
  pageTypeSlug: "temper-poison-effect",
  slug: "invisible",
  title: "Invisible",
  key: "invisible",
  icon: "resources/crafting_alchemy_trait_invisible.png",
  isPositive: true,
  oppositeId: "detection",
  effects: "jsonl",
} as const satisfies TemperPoisonEffect
