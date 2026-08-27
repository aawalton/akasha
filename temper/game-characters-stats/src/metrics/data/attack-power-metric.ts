import type { MetricTemplate } from "../metric-template"

export const attackPowerMetric = {
  id: "attack-power",

  name: "Attack Power",
  category: "base",
  esoStatConstantName: "STAT_ATTACK_POWER",
  valueType: "integer",
  polarity: "higher-is-better",
  fullyImplemented: false,
} satisfies MetricTemplate
