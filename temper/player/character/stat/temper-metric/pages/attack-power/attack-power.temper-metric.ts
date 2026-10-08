import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const attackPower = {
  id: "01a0de67-c007-7db3-8e9f-8927931054e9",
  type: "page-type/temper-metric",
  slug: "attack-power",
  title: "Attack Power",
  category: "base",
  valueType: "integer",
  polarity: "higher-is-better",
  esoStatConstantName: "STAT_ATTACK_POWER",
  fullyImplemented: false,
  createdAt: "2026-09-26T15:48:56.455Z",
  updatedAt: "2026-09-26T15:49:21.000Z",
} as const satisfies TemperMetric
