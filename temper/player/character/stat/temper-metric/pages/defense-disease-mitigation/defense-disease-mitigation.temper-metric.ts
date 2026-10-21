import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const defenseDiseaseMitigation = {
  id: "01a15c8d-0776-7e7d-bdba-21169b20f8a6",
  type: "page-type/temper-metric",
  slug: "defense-disease-mitigation",
  title: "Defense Disease Mitigation",
  category: "advanced",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  esoStatConstantName: "ADVANCED_STAT_DISPLAY_TYPE_DISEASE_RESIST",
  esoStatValuePart: "percent",
  fullyImplemented: true,
  formula: "ts",
  createdAt: "2026-10-21T03:41:48.790Z",
  updatedAt: "2026-10-21T03:41:48.790Z",
} as const satisfies TemperMetric
