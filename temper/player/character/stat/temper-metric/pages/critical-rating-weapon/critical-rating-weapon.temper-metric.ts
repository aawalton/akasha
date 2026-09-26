import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const criticalRatingWeapon = {
  id: "01a0de67-c008-7249-8fa7-65d10fc69391",
  type: "page-type/temper-metric",
  slug: "critical-rating-weapon",
  title: "Weapon Critical Rating",
  category: "base",
  valueType: "rating",
  polarity: "higher-is-better",
  esoStatConstantName: "STAT_CRITICAL_STRIKE",
  divisor: 21912,
  cap: 1,
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
