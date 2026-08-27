import type { MetricTemplate } from "../metric-template"

export const haShockSpellDamageMetric = {
  id: "ha-shock-spell-damage",

  name: "HA Shock Spell Damage",
  valueType: "integer",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: {
    type: "metric-refs",
    metricIds: ["power-spell"],
  },
} satisfies MetricTemplate
