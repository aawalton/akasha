import type { MetricTemplate } from "../metric-template"

export const bloodthirstyMetric = {
  id: "bloodthirsty",

  name: "Bloodthirsty",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: {
    type: "sum",
    effectType: "fractional-change",
  },
} satisfies MetricTemplate
