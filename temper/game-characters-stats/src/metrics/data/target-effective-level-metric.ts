import type { MetricTemplate } from "../metric-template"

export const targetEffectiveLevelMetric = {
  id: "target-effective-level",

  name: "Target Effective Level",
  valueType: "integer",
  polarity: "higher-is-better",
  formula: {
    type: "constant",
    value: 50,
  },
  fullyImplemented: true,
} satisfies MetricTemplate
