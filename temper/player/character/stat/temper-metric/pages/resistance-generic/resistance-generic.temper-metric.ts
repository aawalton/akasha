import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const resistanceGeneric = {
  id: "01a0de67-c00c-7b5c-a498-961f41eec1c9",
  type: "page-type/temper-metric",
  slug: "resistance-generic",
  title: "Generic Resistance",
  category: "base",
  valueType: "integer",
  polarity: "higher-is-better",
  esoStatConstantName: "STAT_DAMAGE_RESIST_GENERIC",
  fullyImplemented: false,
  createdAt: "2026-09-26T15:48:56.460Z",
  updatedAt: "2026-09-26T15:49:21.000Z",
} as const satisfies TemperMetric
