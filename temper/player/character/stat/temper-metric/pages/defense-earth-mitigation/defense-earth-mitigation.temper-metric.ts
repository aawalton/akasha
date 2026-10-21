import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const defenseEarthMitigation = {
  id: "01a15c8e-44ed-7c5b-8169-ab2d0154f9ee",
  type: "page-type/temper-metric",
  slug: "defense-earth-mitigation",
  title: "Defense Earth Mitigation",
  category: "advanced",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  esoStatConstantName: "ADVANCED_STAT_DISPLAY_TYPE_EARTH_RESIST",
  esoStatValuePart: "percent",
  fullyImplemented: true,
  formula: "ts",
  createdAt: "2026-10-21T03:43:10.060Z",
  updatedAt: "2026-10-21T03:43:10.060Z",
} as const satisfies TemperMetric
