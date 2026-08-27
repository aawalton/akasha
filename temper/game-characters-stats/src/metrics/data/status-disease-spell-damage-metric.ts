import type { MetricTemplate } from "../metric-template"

export const statusDiseaseSpellDamageMetric = {
  id: "status-disease-spell-damage",

  name: "Status Disease Spell Damage",
  valueType: "integer",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: {
    type: "metric-refs",
    metricIds: ["power-spell"],
  },
} satisfies MetricTemplate
