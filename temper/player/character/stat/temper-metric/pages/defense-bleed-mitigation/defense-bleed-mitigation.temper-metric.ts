import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const defenseBleedMitigation = {
  id: "01a15c8b-cf84-7035-985c-746d5cd12cfe",
  type: "page-type/temper-metric",
  slug: "defense-bleed-mitigation",
  title: "Defense Bleed Mitigation",
  category: "advanced",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  esoStatConstantName: "ADVANCED_STAT_DISPLAY_TYPE_BLEED_RESIST",
  esoStatValuePart: "percent",
  fullyImplemented: true,
  formula: "ts",
  createdAt: "2026-10-21T03:40:28.932Z",
  updatedAt: "2026-10-21T03:40:28.932Z",
} as const satisfies TemperMetric
