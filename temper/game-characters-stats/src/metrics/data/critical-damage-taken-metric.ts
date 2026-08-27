import type { MetricTemplate } from "../metric-template"

export const criticalDamageTakenMetric = {
  id: "critical-damage-taken",

  name: "Critical Damage Taken",
  valueType: "fractional-change",
  polarity: "lower-is-better",
  formula: {
    type: "add",
    operands: [
      { type: "metric-refs", metricIds: ["target-critical-damage"] },
      {
        type: "multiply",
        operands: [
          { type: "constant", value: -1 },
          {
            type: "metric-refs",
            metricIds: ["resistance-critical"],
            convertRatingToChance: true,
          },
        ],
      },
    ],
  },
  fullyImplemented: true,
} satisfies MetricTemplate
