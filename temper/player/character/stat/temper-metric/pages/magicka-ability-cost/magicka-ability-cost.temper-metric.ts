import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const magickaAbilityCost = {
  id: "01a0de67-c00b-70a4-96fd-4bb955783f50",
  type: "page-type/temper-metric",
  slug: "magicka-ability-cost",
  title: "Magicka Ability Cost",
  valueType: "fractional-change",
  polarity: "lower-is-better",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
