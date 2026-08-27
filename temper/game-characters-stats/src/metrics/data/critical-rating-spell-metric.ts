import type { MetricTemplate } from "../metric-template"

export const criticalRatingSpellMetric = {
  id: "critical-rating-spell",

  name: "Spell Critical Rating",
  category: "base",
  esoStatConstantName: "STAT_SPELL_CRITICAL",
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
