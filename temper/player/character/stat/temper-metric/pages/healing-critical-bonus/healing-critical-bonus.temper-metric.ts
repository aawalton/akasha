import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const healingCriticalBonus = {
  id: "01a0de67-c00a-7cf9-aac6-eb18af70b052",
  type: "page-type/temper-metric",
  slug: "healing-critical-bonus",
  title: "Healing Critical Bonus",
  category: "advanced",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  esoStatConstantName: "ADVANCED_STAT_DISPLAY_TYPE_CRITICAL_HEALING",
  esoStatValuePart: "percent",
  fullyImplemented: true,
  formula: "ts",
  createdAt: "2026-09-26T15:48:56.458Z",
  updatedAt: "2026-09-26T15:49:21.000Z",
} as const satisfies TemperMetric
