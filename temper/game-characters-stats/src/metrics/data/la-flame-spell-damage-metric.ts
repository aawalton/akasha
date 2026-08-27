import type { MetricTemplate } from "../metric-template"

export const laFlameSpellDamageMetric = {
  id: "la-flame-spell-damage",

  name: "LA Flame Spell Damage",
  valueType: "integer",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: {
    type: "metric-refs",
    metricIds: ["power-spell"],
  },
} satisfies MetricTemplate
