import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const criticalDamageTaken = {
  id: "01a0de67-c008-7e8d-8c85-3d76675ba9ac",
  type: "page-type/temper-metric",
  slug: "critical-damage-taken",
  title: "Critical Damage Taken",
  valueType: "fractional-change",
  polarity: "lower-is-better",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
