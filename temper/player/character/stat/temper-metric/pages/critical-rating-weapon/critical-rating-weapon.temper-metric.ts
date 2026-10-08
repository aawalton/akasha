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
  createdAt: "2026-09-26T15:48:56.456Z",
  updatedAt: "2026-09-26T15:49:21.000Z",
} as const satisfies TemperMetric
