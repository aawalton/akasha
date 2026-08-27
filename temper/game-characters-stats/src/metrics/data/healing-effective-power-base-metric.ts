import type { MetricTemplate } from "../metric-template"

export const healingEffectivePowerBaseMetric = {
  id: "healing-effective-power-base",

  name: "Effective Healing Power",
  valueType: "integer",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: {
    type: "metric-refs",
    metricIds: ["effective-healing"],
  },
} satisfies MetricTemplate
