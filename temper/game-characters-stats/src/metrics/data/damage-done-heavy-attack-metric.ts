import type { MetricTemplate } from "../metric-template"

export const damageDoneHeavyAttackMetric = {
  id: "damage-done-heavy-attack",

  name: "Damage Done (Heavy Attack)",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: {
    type: "sum",
    effectType: "fractional-change",
  },
} satisfies MetricTemplate
