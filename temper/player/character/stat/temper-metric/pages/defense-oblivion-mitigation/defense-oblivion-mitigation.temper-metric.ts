import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const defenseOblivionMitigation = {
  id: "01a15c93-7070-73d4-83f0-5f78c1031632",
  type: "page-type/temper-metric",
  slug: "defense-oblivion-mitigation",
  title: "Defense Oblivion Mitigation",
  category: "advanced",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  esoStatConstantName: "ADVANCED_STAT_DISPLAY_TYPE_OBLIVION_RESIST",
  esoStatValuePart: "percent",
  fullyImplemented: true,
  formula: "ts",
  createdAt: "2026-10-21T03:48:48.880Z",
  updatedAt: "2026-10-21T03:48:48.880Z",
} as const satisfies TemperMetric
