import type { MetricTemplate } from "../metric-template"

export const statusMagicSpellDamageMetric = {
  id: "status-magic-spell-damage",

  name: "Status Magic Spell Damage",
  valueType: "integer",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: {
    type: "metric-refs",
    metricIds: ["power-spell"],
  },
} satisfies MetricTemplate
