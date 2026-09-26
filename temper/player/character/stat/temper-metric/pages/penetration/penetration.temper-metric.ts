import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const penetration = {
  id: "01a0de67-c00b-76a1-a80a-0c9bd92b3041",
  type: "page-type/temper-metric",
  slug: "penetration",
  title: "Penetration",
  category: "base",
  valueType: "integer",
  polarity: "higher-is-better",
  esoStatConstantName: "STAT_OFFENSIVE_PENETRATION",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
