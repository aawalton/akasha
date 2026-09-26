import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const targetDefenseBonus = {
  id: "01a0de67-c00c-723d-9112-61679a9fb93e",
  type: "page-type/temper-metric",
  slug: "target-defense-bonus",
  title: "Target Defense Bonus",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
