import type { MetricTemplate } from "../metric-template"

export const statusFrostSpellDamageMetric = {
  id: "status-frost-spell-damage",

  name: "Status Frost Spell Damage",
  valueType: "integer",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: {
    type: "metric-refs",
    metricIds: ["power-spell"],
  },
} satisfies MetricTemplate
