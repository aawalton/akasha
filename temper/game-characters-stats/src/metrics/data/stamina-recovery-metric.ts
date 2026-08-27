import type { MetricTemplate } from "../metric-template"

export const staminaRecoveryMetric = {
  id: "stamina-recovery",
  fullyImplemented: true,

  name: "Stamina Recovery",
  category: "base",
  esoStatConstantName: "STAT_STAMINA_REGEN_COMBAT",
  valueType: "integer",
  polarity: "higher-is-better",
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
