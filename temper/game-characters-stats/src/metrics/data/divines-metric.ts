import type { MetricTemplate } from "../metric-template"

export const divinesMetric = {
  id: "divines",

  name: "Divines",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: {
    type: "sum",
    effectType: "fractional-change",
  },
} satisfies MetricTemplate
