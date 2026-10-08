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
  createdAt: "2026-09-26T15:48:56.459Z",
  updatedAt: "2026-09-26T15:49:21.000Z",
} as const satisfies TemperMetric
