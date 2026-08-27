import type { MetricTemplate } from "../metric-template"

export const healingReductionBaseMetric = {
  id: "healing-reduction-base",

  name: "Healing Reduction",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: {
    type: "sum",
    effectType: "fractional-change",
  },
} satisfies MetricTemplate
