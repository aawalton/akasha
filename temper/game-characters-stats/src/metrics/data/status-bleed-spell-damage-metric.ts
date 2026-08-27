import type { MetricTemplate } from "../metric-template"

export const statusBleedSpellDamageMetric = {
  id: "status-bleed-spell-damage",

  name: "Status Bleed Spell Damage",
  valueType: "integer",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: {
    type: "metric-refs",
    metricIds: ["power-spell"],
  },
} satisfies MetricTemplate
