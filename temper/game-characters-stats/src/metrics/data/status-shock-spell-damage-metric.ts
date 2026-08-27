import type { MetricTemplate } from "../metric-template"

export const statusShockSpellDamageMetric = {
  id: "status-shock-spell-damage",

  name: "Status Shock Spell Damage",
  valueType: "integer",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: {
    type: "metric-refs",
    metricIds: ["power-spell"],
  },
} satisfies MetricTemplate
