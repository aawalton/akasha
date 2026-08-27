import type { MetricTemplate } from "../metric-template"

export const resurrectSpeedMetric = {
  id: "resurrect-speed",

  name: "Resurrect Time",
  valueType: "number-per-second",
  polarity: "lower-is-better",
  fullyImplemented: true,
  formula: {
    type: "multiply",
    operands: [
      { type: "constant", value: 7 },
      {
        type: "add",
        operands: [
          { type: "constant", value: 1 },
          { type: "sum", categories: ["sets"], effectType: "fractional-change" },
        ],
      },
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
          { type: "sum", categories: ["buffs"], effectType: "fractional-change" },
        ],
      },
      {
        type: "add",
        operands: [
          { type: "constant", value: 1 },
          { type: "sum", categories: ["champion-points"], effectType: "fractional-change" },
        ],
      },
      {
        type: "add",
        operands: [
          { type: "constant", value: 1 },
          {
            type: "sum",
            categories: ["armor", "weapons", "jewelry"],
            effectType: "fractional-change",
          },
        ],
      },
    ],
  },
} satisfies MetricTemplate
