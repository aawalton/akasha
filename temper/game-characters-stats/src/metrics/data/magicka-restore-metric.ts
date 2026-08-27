import type { MetricTemplate } from "../metric-template"

export const magickaRestoreMetric = {
  id: "magicka-restore",
  fullyImplemented: true,

  name: "Restore Magicka",
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
