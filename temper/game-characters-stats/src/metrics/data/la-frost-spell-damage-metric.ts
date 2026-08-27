import type { MetricTemplate } from "../metric-template"

export const laFrostSpellDamageMetric = {
  id: "la-frost-spell-damage",

  name: "LA Frost Spell Damage",
  valueType: "integer",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: {
    type: "metric-refs",
    metricIds: ["power-spell"],
  },
} satisfies MetricTemplate
