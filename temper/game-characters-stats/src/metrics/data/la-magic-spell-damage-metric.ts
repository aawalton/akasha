import type { MetricTemplate } from "../metric-template"

export const laMagicSpellDamageMetric = {
  id: "la-magic-spell-damage",

  name: "LA Magic Spell Damage",
  valueType: "integer",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: {
    type: "metric-refs",
    metricIds: ["power-spell"],
  },
} satisfies MetricTemplate
