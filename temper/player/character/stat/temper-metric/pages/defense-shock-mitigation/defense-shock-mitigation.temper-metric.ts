import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const defenseShockMitigation = {
  id: "01a15c95-e7e6-7a46-a0e3-222860155b29",
  type: "page-type/temper-metric",
  slug: "defense-shock-mitigation",
  title: "Defense Shock Mitigation",
  category: "advanced",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  esoStatConstantName: "ADVANCED_STAT_DISPLAY_TYPE_SHOCK_RESIST",
  esoStatValuePart: "percent",
  fullyImplemented: true,
  formula: "ts",
  createdAt: "2026-10-21T03:51:30.534Z",
  updatedAt: "2026-10-21T03:51:30.534Z",
} as const satisfies TemperMetric
