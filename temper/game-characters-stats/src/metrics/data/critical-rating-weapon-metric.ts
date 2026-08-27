import type { MetricTemplate } from "../metric-template"

export const criticalRatingWeaponMetric = {
  id: "critical-rating-weapon",

  name: "Weapon Critical Rating",
  category: "base",
  esoStatConstantName: "STAT_CRITICAL_STRIKE",
  valueType: "rating",
  divisor: 21912,
  cap: 1,
  polarity: "higher-is-better",
  formula: {
    type: "sum",
    effectType: "integer",
  },
  fullyImplemented: true,
} satisfies MetricTemplate
