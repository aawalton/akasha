import type { MetricTemplate } from "../metric-template"

export const statusPhysicalSpellDamageMetric = {
  id: "status-physical-spell-damage",

  name: "Status Physical Spell Damage",
  valueType: "integer",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: {
    type: "metric-refs",
    metricIds: ["power-spell"],
  },
} satisfies MetricTemplate
