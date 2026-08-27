import type { MetricTemplate } from "../metric-template"

export const haFrostSpellDamageMetric = {
  id: "ha-frost-spell-damage",

  name: "HA Frost Spell Damage",
  valueType: "integer",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: {
    type: "metric-refs",
    metricIds: ["power-spell"],
  },
} satisfies MetricTemplate
