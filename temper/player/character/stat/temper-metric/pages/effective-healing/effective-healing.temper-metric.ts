import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const effectiveHealing = {
  id: "01a0de67-c009-7ca7-bc56-72561fc01e4b",
  type: "page-type/temper-metric",
  slug: "effective-healing",
  title: "Effective Healing Power",
  valueType: "integer",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
