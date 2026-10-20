import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const resistanceDisease = {
  id: "01a0de67-c00b-77c5-b5b9-c1e7912340d9",
  type: "page-type/temper-metric",
  slug: "resistance-disease",
  title: "Disease Resistance",
  category: "base",
  valueType: "rating",
  polarity: "higher-is-better",
  esoStatConstantName: "STAT_DAMAGE_RESIST_DISEASE",
  advancedSheetRow: "disease-resist",
  divisor: 66000,
  cap: 0.5,
  fullyImplemented: true,
  formula: "ts",
  createdAt: "2026-09-26T15:48:56.459Z",
  updatedAt: "2026-10-20T15:41:13.215Z",
} as const satisfies TemperMetric
