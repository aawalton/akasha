import type { MetricTemplate } from "../metric-template"

export const damageDoneAoeMetric = {
  id: "damage-done-aoe",

  name: "Damage Done (AOE)",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: {
    type: "sum",
    effectType: "fractional-change",
  },
} satisfies MetricTemplate
