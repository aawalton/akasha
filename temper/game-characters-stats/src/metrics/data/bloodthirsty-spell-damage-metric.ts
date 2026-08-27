import type { MetricTemplate } from "../metric-template"

export const bloodthirstySpellDamageMetric = {
  id: "bloodthirsty-spell-damage",

  name: "Bloodthirsty Spell Damage",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  fullyImplemented: false,
  formula: {
    type: "metric-refs",
    metricIds: ["bloodthirsty"],
  },
} satisfies MetricTemplate
