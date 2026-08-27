import type { MetricTemplate } from "../metric-template"

export const penetrationMetric = {
  id: "penetration",

  name: "Penetration",
  category: "base",
  esoStatConstantName: "STAT_OFFENSIVE_PENETRATION",
  valueType: "integer",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: {
    type: "add",
    operands: [
      {
        type: "sum",
        effectType: "integer",
      },
    ],
  },
} satisfies MetricTemplate
