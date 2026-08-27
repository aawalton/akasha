import type { MetricTemplate } from "../metric-template"

export const healthRecoveryMetric = {
  id: "health-recovery",

  name: "Health Recovery",
  category: "base",
  esoStatConstantName: "STAT_HEALTH_REGEN_COMBAT",
  valueType: "integer",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: {
    type: "multiply",
    operands: [
      {
        type: "floor",
        operand: { type: "sum", effectType: "integer" },
      },
      { type: "product", effectType: "fractional-change" },
    ],
  },
} satisfies MetricTemplate
