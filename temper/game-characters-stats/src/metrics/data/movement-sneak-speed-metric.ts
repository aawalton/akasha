import type { MetricTemplate } from "../metric-template"

export const movementSneakSpeedMetric = {
  id: "movement-sneak-speed",

  name: "Sneak Speed",
  category: "advanced",
  esoStatConstantName: "ADVANCED_STAT_DISPLAY_TYPE_SNEAK_SPEED_REDUCTION",
  esoStatValuePart: "percent",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: {
    type: "multiply",
    operands: [
      { type: "constant", value: 1 },
      {
        type: "add",
        operands: [
          { type: "constant", value: 1 },
          { type: "metric-refs", metricIds: ["movement-sneak-penalty"] },
          {
            type: "sum",
            categories: ["buffs", "mundus", "skills", "sets"],
            effectType: "fractional-change",
          },
        ],
      },
      {
        type: "product",
        effectType: "fractional-change",
      },
    ],
  },
} satisfies MetricTemplate
