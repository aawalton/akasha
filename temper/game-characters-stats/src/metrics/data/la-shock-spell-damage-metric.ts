import type { MetricTemplate } from "../metric-template"

export const laShockSpellDamageMetric = {
  id: "la-shock-spell-damage",

  name: "LA Shock Spell Damage",
  valueType: "integer",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: {
    type: "metric-refs",
    metricIds: ["power-spell"],
  },
} satisfies MetricTemplate
