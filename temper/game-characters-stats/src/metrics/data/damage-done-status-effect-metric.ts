import type { MetricTemplate } from "../metric-template"

export const damageDoneStatusEffectMetric = {
  id: "damage-done-status-effect",

  name: "Damage Done (Status Effect)",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: {
    type: "sum",
    effectType: "fractional-change",
  },
} satisfies MetricTemplate
