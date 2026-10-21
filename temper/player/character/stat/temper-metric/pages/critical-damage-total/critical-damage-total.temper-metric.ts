import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const criticalDamageTotal = {
  id: "01a15c3c-0147-7d85-bd6d-00b4f05c0af6",
  type: "page-type/temper-metric",
  slug: "critical-damage-total",
  title: "Critical Damage With Base",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
  createdAt: "2026-10-21T02:13:18.790Z",
  updatedAt: "2026-10-21T02:13:18.790Z",
} as const satisfies TemperMetric
