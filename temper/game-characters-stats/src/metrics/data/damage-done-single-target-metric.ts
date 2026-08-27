import type { MetricTemplate } from "../metric-template"

export const damageDoneSingleTargetMetric = {
  id: "damage-done-single-target",

  name: "Damage Done (Single Target)",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: {
    type: "sum",
    effectType: "fractional-change",
  },
} satisfies MetricTemplate
