import type { MetricTemplate } from "../metric-template"

export const laMeleeSpeedMetric = {
  id: "la-melee-speed",

  name: "LA Melee Speed",
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
