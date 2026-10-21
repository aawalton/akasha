import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const healingCriticalTotal = {
  id: "01a15c3e-4873-77e0-a6d8-36465f006ee5",
  type: "page-type/temper-metric",
  slug: "healing-critical-total",
  title: "Critical Healing With Base",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
  createdAt: "2026-10-21T02:15:48.082Z",
  updatedAt: "2026-10-21T02:15:48.082Z",
} as const satisfies TemperMetric
