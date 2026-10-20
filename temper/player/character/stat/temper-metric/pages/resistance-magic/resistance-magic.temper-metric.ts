import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const resistanceMagic = {
  id: "01a0de67-c00c-724d-a962-e962b670d59c",
  type: "page-type/temper-metric",
  slug: "resistance-magic",
  title: "Magic Resistance",
  category: "base",
  valueType: "rating",
  polarity: "higher-is-better",
  esoStatConstantName: "STAT_DAMAGE_RESIST_MAGIC",
  advancedSheetRow: "magic-resist",
  divisor: 66000,
  cap: 0.5,
  fullyImplemented: true,
  formula: "ts",
  createdAt: "2026-09-26T15:48:56.460Z",
  updatedAt: "2026-10-20T15:41:13.215Z",
} as const satisfies TemperMetric
