import type { MetricTemplate } from "../metric-template"

export const poisonedDurationMetric = {
  id: "poisoned-duration",

  name: "Poisoned Duration",
  valueType: "number-per-second",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: {
    type: "constant",
    value: 6.0,
  },
} satisfies MetricTemplate
