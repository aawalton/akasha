import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const healingEffectivePowerBase = {
  id: "01a0de67-c00a-7444-b3c0-afd7c003e1e2",
  type: "page-type/temper-metric",
  slug: "healing-effective-power-base",
  title: "Effective Healing Power",
  valueType: "integer",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
