import type { MetricTemplate } from "../metric-template"

export const laSpeedMetric = {
  id: "la-speed",

  name: "LA Speed",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: {
    type: "add",
    operands: [
      { type: "constant", value: 1 },
      { type: "sum", effectType: "fractional-change" },
    ],
  },
} satisfies MetricTemplate
