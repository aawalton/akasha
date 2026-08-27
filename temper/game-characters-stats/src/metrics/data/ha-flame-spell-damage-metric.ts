import type { MetricTemplate } from "../metric-template"

export const haFlameSpellDamageMetric = {
  id: "ha-flame-spell-damage",

  name: "HA Flame Spell Damage",
  valueType: "integer",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: {
    type: "metric-refs",
    metricIds: ["power-spell"],
  },
} satisfies MetricTemplate
