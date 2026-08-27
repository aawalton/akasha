import type { MetricTemplate } from "../metric-template"

export const resistanceGenericMetric = {
  id: "resistance-generic",

  name: "Generic Resistance",
  category: "base",
  esoStatConstantName: "STAT_DAMAGE_RESIST_GENERIC",
  valueType: "integer",
  polarity: "higher-is-better",
  fullyImplemented: false,
} satisfies MetricTemplate
