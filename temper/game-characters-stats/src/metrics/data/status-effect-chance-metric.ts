import type { MetricTemplate } from "../metric-template"

export const statusEffectChanceMetric = {
  id: "status-effect-chance",

  name: "Status Effect Chance",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: {
    type: "sum",
    effectType: "fractional-change",
  },
} satisfies MetricTemplate
