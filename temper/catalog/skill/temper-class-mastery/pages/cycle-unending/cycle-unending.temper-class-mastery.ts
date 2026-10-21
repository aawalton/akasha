import type { TemperClassMastery } from "akasha/temper/catalog/skill/temper-class-mastery/temper-class-mastery.page-type.types.ts"

export const cycleUnending = {
  id: "01a15ea7-5feb-7789-a611-2f110ab3703a",
  type: "page-type/temper-class-mastery",
  slug: "cycle-unending",
  title: "Cycle Unending",
  key: "cycle-unending",
  description:
    "The cycle of life and death continues: you will live, others will die.\n\nUpgrades rank 2 of Reusable Parts to grant Cycle Unending for 25 seconds, increasing the potency of your damage done by 1% for every 1% Health you have more than your target. The damage bonus caps at 25%, or 10% against players.",
  esoSkillId: 263509,
  class: "temper-class/necromancer",
  hashPlace: 12,
  createdAt: "2026-10-21T13:29:49.800Z",
  updatedAt: "2026-10-21T13:29:49.800Z",
} as const satisfies TemperClassMastery
