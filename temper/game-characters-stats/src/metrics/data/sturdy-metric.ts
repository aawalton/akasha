import type { MetricTemplate } from "../metric-template"

export const sturdyMetric = {
  id: "sturdy",

  name: "Sturdy",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: {
    type: "sum",
    effectType: "fractional-change",
  },
} satisfies MetricTemplate
