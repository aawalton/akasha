import type { MetricTemplate } from "../metric-template"

export const haPhysicalSpellDamageMetric = {
  id: "ha-physical-spell-damage",

  name: "HA Physical Spell Damage",
  valueType: "integer",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: {
    type: "metric-refs",
    metricIds: ["power-spell"],
  },
} satisfies MetricTemplate
