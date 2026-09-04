import type { TemperPoisonEffect } from "../../temper-poison-effect.page-type.ts"

export const entrapment = {
  id: "019e21f7-0f73-7ef7-a770-a4c141f2939e",
  pageTypeSlug: "temper-poison-effect",
  slug: "entrapment",
  title: "Entrapment",
  key: "entrapment",
  icon: "resources/crafting_alchemy_trait_stun.png",
  isPositive: false,
  oppositeId: "unstoppable",
} as const satisfies TemperPoisonEffect
