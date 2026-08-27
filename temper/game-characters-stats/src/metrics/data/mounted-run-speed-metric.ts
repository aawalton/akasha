import type { MetricTemplate } from "../metric-template"

export const mountedRunSpeedMetric = {
  id: "mounted-run-speed",

  name: "Mounted Run Speed",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: {
    type: "multiply",
    operands: [
      {
        type: "sum",
        effectType: "fractional-change",
      },
      {
        type: "product",
        effectType: "fractional-change",
      },
    ],
  },
} satisfies MetricTemplate
