import type { MetricTemplate } from "../metric-template"

export const movementSwimSpeedMetric = {
  id: "movement-swim-speed",

  name: "Swim Speed",
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
