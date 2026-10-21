import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const defenseFlameMitigation = {
  id: "01a15c8a-21f4-7b08-b3d4-c1d87f0f8bb5",
  type: "page-type/temper-metric",
  slug: "defense-flame-mitigation",
  title: "Defense Flame Mitigation",
  category: "advanced",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  esoStatConstantName: "ADVANCED_STAT_DISPLAY_TYPE_FIRE_RESIST",
  esoStatValuePart: "percent",
  fullyImplemented: true,
  formula: "ts",
  createdAt: "2026-10-21T03:38:38.964Z",
  updatedAt: "2026-10-21T03:38:38.964Z",
} as const satisfies TemperMetric
