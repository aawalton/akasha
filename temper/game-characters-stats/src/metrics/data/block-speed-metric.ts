import type { MetricTemplate } from "../metric-template"

export const blockSpeedMetric = {
  id: "block-speed",

  name: "Block Speed",
  category: "advanced",
  esoStatConstantName: "ADVANCED_STAT_DISPLAY_TYPE_BLOCK_SPEED",
  esoStatValuePart: "percent",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  formula: {
    type: "multiply",
    operands: [
      { type: "constant", value: 0.4 },
      {
        type: "add",
        operands: [
          { type: "constant", value: 1 },
          { type: "sum", categories: ["skills"], effectType: "fractional-change" },
        ],
      },
      {
        type: "add",
        operands: [
          { type: "constant", value: 1 },
          { type: "sum", categories: ["champion-points"], effectType: "fractional-change" },
        ],
      },
    ],
  },
  fullyImplemented: true,
} satisfies MetricTemplate
