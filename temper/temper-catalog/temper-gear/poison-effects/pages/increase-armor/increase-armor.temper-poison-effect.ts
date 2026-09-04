import type { TemperPoisonEffect } from "../../temper-poison-effect.page-type.ts"

export const increaseArmor = {
  id: "019e21f7-0f66-7ae7-8005-0e1df608a596",
  pageTypeSlug: "temper-poison-effect",
  slug: "increase-armor",
  title: "Increase Physical Resistance",
  key: "increase-armor",
  icon: "resources/crafting_alchemy_trait_increasearmor.png",
  isPositive: true,
  oppositeId: "fracture",
  effects: "jsonl",
} as const satisfies TemperPoisonEffect
