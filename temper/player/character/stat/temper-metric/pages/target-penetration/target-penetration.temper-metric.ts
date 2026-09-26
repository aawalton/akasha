import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const targetPenetration = {
  id: "01a0de67-c00c-7e19-bf08-a1e707a7f2cd",
  type: "page-type/temper-metric",
  slug: "target-penetration",
  title: "Target Penetration",
  valueType: "integer",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
