import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const defenseFrostMitigation = {
  id: "01a15c8f-df77-712c-9309-15090c31e5af",
  type: "page-type/temper-metric",
  slug: "defense-frost-mitigation",
  title: "Defense Frost Mitigation",
  category: "advanced",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  esoStatConstantName: "ADVANCED_STAT_DISPLAY_TYPE_FROST_RESIST",
  esoStatValuePart: "percent",
  fullyImplemented: true,
  formula: "ts",
  createdAt: "2026-10-21T03:44:55.158Z",
  updatedAt: "2026-10-21T03:44:55.158Z",
} as const satisfies TemperMetric
