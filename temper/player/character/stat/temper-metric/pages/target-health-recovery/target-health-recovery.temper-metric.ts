import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const targetHealthRecovery = {
  id: "01a0de67-c00c-7e92-af98-a4b180248cc0",
  type: "page-type/temper-metric",
  slug: "target-health-recovery",
  title: "Target Health Recovery",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
  createdAt: "2026-09-26T15:48:56.460Z",
  updatedAt: "2026-09-26T15:49:21.000Z",
} as const satisfies TemperMetric
