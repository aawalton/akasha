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
  createdAt: "2026-09-26T15:48:56.456Z",
  updatedAt: "2026-09-26T15:49:21.000Z",
} as const satisfies TemperMetric
