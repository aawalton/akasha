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
} as const satisfies TemperMetric
