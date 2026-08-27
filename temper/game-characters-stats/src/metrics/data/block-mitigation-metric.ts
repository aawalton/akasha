import type { MetricTemplate } from "../metric-template"

export const blockMitigationMetric = {
  id: "block-mitigation",

  name: "Block Mitigation",
  category: "advanced",
  esoStatConstantName: "ADVANCED_STAT_DISPLAY_TYPE_BLOCK_MITIGATION",
  esoStatValuePart: "percent",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  formula: {
    type: "add",
    operands: [
      { type: "constant", value: 1 },
      {
        type: "multiply",
        operands: [
          { type: "constant", value: -0.5 },
          {
            type: "add",
            operands: [
              { type: "constant", value: 1 },
              {
                type: "multiply",
                operands: [
                  { type: "constant", value: -1 },
                  {
                    type: "sum",
                    effectType: "fractional-change",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  fullyImplemented: true,
} satisfies MetricTemplate
