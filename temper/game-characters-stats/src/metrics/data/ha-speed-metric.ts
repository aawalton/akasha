import type { MetricTemplate } from "../metric-template"

export const haSpeedMetric = {
  id: "ha-speed",

  name: "HA Speed",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: {
    type: "constant",
    value: 1,
  },
} satisfies MetricTemplate
