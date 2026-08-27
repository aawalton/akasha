import type { MetricTemplate } from "../metric-template"

export const statusFlameSpellDamageMetric = {
  id: "status-flame-spell-damage",

  name: "Status Flame Spell Damage",
  valueType: "integer",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: {
    type: "metric-refs",
    metricIds: ["power-spell"],
  },
} satisfies MetricTemplate
