import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const healthRecovery = {
  id: "01a0de67-c00a-776e-9dd6-150f6d8a78b2",
  type: "page-type/temper-metric",
  slug: "health-recovery",
  title: "Health Recovery",
  category: "base",
  valueType: "integer",
  polarity: "higher-is-better",
  esoStatConstantName: "STAT_HEALTH_REGEN_COMBAT",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
