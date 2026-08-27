import type { MetricTemplate } from "../metric-template"

export const defenseCritDmgMetric = {
  id: "defense-crit-dmg",

  name: "Defense Crit Damage",
  valueType: "fractional-change",
  polarity: "lower-is-better",
  fullyImplemented: true,
  formula: {
    type: "multiply",
    operands: [
      { type: "metric-refs", metricIds: ["resistance-critical"] },
      { type: "constant", value: -0.00014 },
    ],
  },
} satisfies MetricTemplate
