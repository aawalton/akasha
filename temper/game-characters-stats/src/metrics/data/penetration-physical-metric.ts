import type { MetricTemplate } from "../metric-template"

export const penetrationPhysicalMetric = {
  id: "penetration-physical",

  name: "Physical Penetration",
  category: "base",
  esoStatConstantName: "STAT_PHYSICAL_PENETRATION",
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
