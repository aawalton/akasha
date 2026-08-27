import type { MetricTemplate } from "../metric-template"

export const staminaRestoreMetric = {
  id: "stamina-restore",
  fullyImplemented: true,

  name: "Restore Stamina",
  valueType: "number-per-second",
  polarity: "higher-is-better",
  formula: {
    type: "add",
    operands: [
      {
        type: "sum",
        effectType: "number-per-seconds",
      },
    ],
  },
} satisfies MetricTemplate
