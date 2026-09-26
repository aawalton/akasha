import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const targetMagickaAbilityCost = {
  id: "01a0de67-c00c-7861-a3f0-6f0449452f6c",
  type: "page-type/temper-metric",
  slug: "target-magicka-ability-cost",
  title: "Target Magicka Ability Cost",
  valueType: "fractional-change",
  polarity: "lower-is-better",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
