import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const targetPower = {
  id: "01a0de67-c00c-7abe-92ca-b6cd41c15c05",
  type: "page-type/temper-metric",
  slug: "target-power",
  title: "Target Power",
  valueType: "integer",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
