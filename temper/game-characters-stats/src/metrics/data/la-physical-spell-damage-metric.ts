import type { MetricTemplate } from "../metric-template"

export const laPhysicalSpellDamageMetric = {
  id: "la-physical-spell-damage",

  name: "LA Physical Spell Damage",
  valueType: "integer",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: {
    type: "metric-refs",
    metricIds: ["power-spell"],
  },
} satisfies MetricTemplate
