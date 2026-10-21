import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const defenseMagicMitigation = {
  id: "01a15c91-4336-75ea-a9b8-22e4bbcc52d8",
  type: "page-type/temper-metric",
  slug: "defense-magic-mitigation",
  title: "Defense Magic Mitigation",
  category: "advanced",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  esoStatConstantName: "ADVANCED_STAT_DISPLAY_TYPE_MAGIC_RESIST",
  esoStatValuePart: "percent",
  fullyImplemented: true,
  formula: "ts",
  createdAt: "2026-10-21T03:46:26.230Z",
  updatedAt: "2026-10-21T03:46:26.230Z",
} as const satisfies TemperMetric
