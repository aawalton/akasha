import type { MetricTemplate } from "../metric-template"

export const resistanceOblivionMetric = {
  id: "resistance-oblivion",

  name: "Oblivion Resistance",
  category: "base",
  esoStatConstantName: "STAT_DAMAGE_RESIST_OBLIVION",
  valueType: "rating",
  divisor: 66000,
  cap: 0.5,
  polarity: "higher-is-better",
  formula: {
    type: "floor",
    operand: {
      type: "multiply",
      operands: [
        {
          type: "add",
          operands: [
            {
              type: "sum",
              effectType: "integer",
            },
          ],
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
  },
  fullyImplemented: true,
} satisfies MetricTemplate
