import type { MetricTemplate } from "../metric-template"

export const statusPoisonSpellDamageMetric = {
  id: "status-poison-spell-damage",

  name: "Status Poison Spell Damage",
  valueType: "integer",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: {
    type: "metric-refs",
    metricIds: ["power-spell"],
  },
} satisfies MetricTemplate
