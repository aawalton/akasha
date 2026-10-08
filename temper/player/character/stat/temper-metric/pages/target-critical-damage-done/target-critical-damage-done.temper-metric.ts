import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const targetCriticalDamageDone = {
  id: "01a0de67-c00c-7216-9b0a-79be23c554ed",
  type: "page-type/temper-metric",
  slug: "target-critical-damage-done",
  title: "Target Critical Damage Done",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
  createdAt: "2026-09-26T15:48:56.460Z",
  updatedAt: "2026-09-26T15:49:21.000Z",
} as const satisfies TemperMetric
