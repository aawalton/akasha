import type { MetricTemplate } from "../metric-template"

export const mountStaminaMaximumMetric = {
  id: "mount-stamina-maximum",

  name: "Mount Stamina Maximum",
  category: "base",
  esoStatConstantName: "STAT_MOUNT_STAMINA_MAX",
  valueType: "integer",
  polarity: "higher-is-better",
  fullyImplemented: false,
} satisfies MetricTemplate
