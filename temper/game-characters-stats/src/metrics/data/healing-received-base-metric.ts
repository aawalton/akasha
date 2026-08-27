import type { MetricTemplate } from "../metric-template"

export const healingReceivedBaseMetric = {
  id: "healing-received-base",

  name: "Healing Received",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: {
    type: "sum",
    effectType: "fractional-change",
  },
} satisfies MetricTemplate
