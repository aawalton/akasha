import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const penetrationPhysical = {
  id: "01a0de67-c00b-7609-a1f7-95be71792e07",
  type: "page-type/temper-metric",
  slug: "penetration-physical",
  title: "Physical Penetration",
  category: "base",
  valueType: "integer",
  polarity: "higher-is-better",
  esoStatConstantName: "STAT_PHYSICAL_PENETRATION",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
