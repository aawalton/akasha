import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const resistanceEarth = {
  id: "01a0de67-c00b-709a-ad70-563afb34e31c",
  type: "page-type/temper-metric",
  slug: "resistance-earth",
  title: "Earth Resistance",
  category: "base",
  valueType: "rating",
  polarity: "higher-is-better",
  esoStatConstantName: "STAT_DAMAGE_RESIST_EARTH",
  advancedSheetRow: "earth-resist",
  divisor: 66000,
  cap: 0.5,
  fullyImplemented: true,
  formula: "ts",
  createdAt: "2026-09-26T15:48:56.459Z",
  updatedAt: "2026-10-20T15:41:13.215Z",
} as const satisfies TemperMetric
