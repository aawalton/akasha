import type { MetricTemplate } from "../metric-template"

export const movementSprintSpeedMetric = {
  id: "movement-sprint-speed",

  name: "Sprint Speed",
  category: "advanced",
  esoStatConstantName: "ADVANCED_STAT_DISPLAY_TYPE_SPRINT_SPEED",
  esoStatValuePart: "percent",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: {
    type: "min",
    operands: [
      { type: "constant", value: 2 },
      {
        type: "add",
        operands: [
          { type: "constant", value: 1 },
          { type: "constant", value: 0.4 },
          { type: "sum", effectType: "fractional-change" },
        ],
      },
    ],
  },
} satisfies MetricTemplate
