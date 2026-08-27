import type { MetricTemplate } from "../metric-template"

export const magickaRecoveryMetric = {
  id: "magicka-recovery",
  fullyImplemented: true,

  name: "Magicka Recovery",
  category: "base",
  esoStatConstantName: "STAT_MAGICKA_REGEN_COMBAT",
  valueType: "integer",
  polarity: "higher-is-better",
  formula: {
    type: "multiply",
    operands: [
      {
        type: "floor",
        operand: { type: "sum", effectType: "integer" },
      },
      {
        type: "add",
        operands: [
          { type: "constant", value: 1 },
          {
            type: "sum",
            effectType: "fractional-change",
          },
        ],
      },
    ],
  },
} satisfies MetricTemplate
