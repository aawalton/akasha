import type { MetricTemplate } from "../metric-template"

export const haMagicSpellDamageMetric = {
  id: "ha-magic-spell-damage",

  name: "HA Magic Spell Damage",
  valueType: "integer",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: {
    type: "metric-refs",
    metricIds: ["power-spell"],
  },
} satisfies MetricTemplate
