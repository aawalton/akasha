import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const resistanceBleed = {
  id: "01a0de67-c00b-7d45-bc00-08d63dd2395d",
  type: "page-type/temper-metric",
  slug: "resistance-bleed",
  title: "Bleed Resistance",
  category: "base",
  valueType: "rating",
  polarity: "higher-is-better",
  esoStatConstantName: "STAT_DAMAGE_RESIST_BLEED",
  advancedSheetRow: "bleed-resist",
  divisor: 66000,
  cap: 0.5,
  fullyImplemented: true,
  formula: "ts",
  createdAt: "2026-09-26T15:48:56.459Z",
  updatedAt: "2026-10-20T15:41:13.215Z",
} as const satisfies TemperMetric
