import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const damageDoneEarth = {
  id: "01a0de67-c008-75df-bf6a-ea8e6b0d7270",
  type: "page-type/temper-metric",
  slug: "damage-done-earth",
  title: "Damage Done (Earth)",
  category: "advanced",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  esoStatConstantName: "ADVANCED_STAT_DISPLAY_TYPE_EARTH_DAMAGE",
  esoStatValuePart: "percent",
  fullyImplemented: true,
  formula: "ts",
  createdAt: "2026-09-26T15:48:56.456Z",
  updatedAt: "2026-09-26T15:49:21.000Z",
} as const satisfies TemperMetric
