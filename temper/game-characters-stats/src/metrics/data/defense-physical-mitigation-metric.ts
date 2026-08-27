import type { MetricTemplate } from "../metric-template"

export const defensePhysicalMitigationMetric = {
  id: "defense-physical-mitigation",

  name: "Defense Physical Mitigation",
  category: "advanced",
  esoStatConstantName: "ADVANCED_STAT_DISPLAY_TYPE_PHYSICAL_RESIST",
  esoStatValuePart: "percent",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  fullyImplemented: false,
  formula: {
    type: "divide",
    operands: [
      {
        type: "min",
        operands: [
          { type: "constant", value: 33000 },
          { type: "metric-refs", metricIds: ["resistance-physical"] },
        ],
      },
      { type: "constant", value: 66000 },
    ],
  },
} satisfies MetricTemplate
