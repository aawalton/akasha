import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const resistancePoison = {
  id: "01a0de67-c00c-743f-863d-9097417e9831",
  type: "page-type/temper-metric",
  slug: "resistance-poison",
  title: "Poison Resistance",
  category: "base",
  valueType: "rating",
  polarity: "higher-is-better",
  esoStatConstantName: "STAT_DAMAGE_RESIST_POISON",
  advancedSheetRow: "poison-resist",
  divisor: 66000,
  cap: 0.5,
  fullyImplemented: true,
  formula: "ts",
  createdAt: "2026-09-26T15:48:56.460Z",
  updatedAt: "2026-10-20T15:41:13.215Z",
} as const satisfies TemperMetric
