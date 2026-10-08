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
  createdAt: "2026-09-26T15:48:56.460Z",
  updatedAt: "2026-09-26T15:49:21.000Z",
} as const satisfies TemperMetric
