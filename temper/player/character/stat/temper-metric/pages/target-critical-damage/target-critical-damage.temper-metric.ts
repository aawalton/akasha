import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const targetCriticalDamage = {
  id: "01a0de67-c00c-774a-919a-d17c3a6bd94a",
  type: "page-type/temper-metric",
  slug: "target-critical-damage",
  title: "Target Critical Damage",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
