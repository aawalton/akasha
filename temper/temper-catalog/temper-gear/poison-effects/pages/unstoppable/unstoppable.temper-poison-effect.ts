import type { TemperPoisonEffect } from "../../temper-poison-effect.page-type.ts"

export const unstoppable = {
  id: "019e21f7-0f72-7e85-a744-be091c685ded",
  pageTypeSlug: "temper-poison-effect",
  slug: "unstoppable",
  title: "Unstoppable",
  key: "unstoppable",
  icon: "resources/crafting_alchemy_trait_unstoppable.png",
  isPositive: true,
  oppositeId: "entrapment",
} as const satisfies TemperPoisonEffect
