import type { MetricTemplate } from "../metric-template"

export const magickaMaximumMetric = {
  id: "magicka-maximum",
  fullyImplemented: true,

  name: "Max Magicka",
  category: "base",
  esoStatConstantName: "STAT_MAGICKA_MAX",
  valueType: "integer",
  polarity: "higher-is-better",
  formula: {
    type: "multiply",
    operands: [
      { type: "sum", effectType: "integer" },
      { type: "product", effectType: "fractional-change" },
    ],
  },
} satisfies MetricTemplate
