import type { MetricTemplate } from "../metric-template"

export const healingEffectiveSelfPowerMetric = {
  id: "healing-effective-self-power",

  name: "Effective Self Healing Power",
  valueType: "integer",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: {
    type: "metric-refs",
    metricIds: ["effective-healing"],
  },
} satisfies MetricTemplate
