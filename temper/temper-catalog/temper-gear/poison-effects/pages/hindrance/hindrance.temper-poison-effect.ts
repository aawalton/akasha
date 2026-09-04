import type { TemperPoisonEffect } from "../../temper-poison-effect.page-type.ts"

export const hindrance = {
  id: "019e21f7-0f77-7884-82d0-ee5f2a49b5fe",
  pageTypeSlug: "temper-poison-effect",
  slug: "hindrance",
  title: "Hindrance",
  key: "hindrance",
  icon: "resources/crafting_alchemy_trait_reducespeed.png",
  isPositive: false,
  oppositeId: "speed",
  effects: "jsonl",
} as const satisfies TemperPoisonEffect
