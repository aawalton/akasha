import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const targetResistance = {
  id: "01a0de67-c00c-7171-93a0-861c68ad0db6",
  type: "page-type/temper-metric",
  slug: "target-resistance",
  title: "Target Resistance",
  valueType: "integer",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
  createdAt: "2026-09-26T15:48:56.460Z",
  updatedAt: "2026-09-26T15:49:21.000Z",
} as const satisfies TemperMetric
