import type { MetricTemplate } from "../metric-template"

export const ultimateRecoveryMetric = {
  id: "ultimate-recovery",
  fullyImplemented: true,

  name: "Ultimate Recovery",
  category: "advanced",
  esoStatConstantName: "ADVANCED_STAT_DISPLAY_TYPE_ULTIMATE_REGEN_COMBAT",
  esoStatValuePart: "flat",
  valueType: "integer",
  polarity: "higher-is-better",
  formula: {
    type: "add",
    operands: [
      { type: "constant", value: 3 },
      {
        type: "sum",
        effectType: "number-per-seconds",
      },
    ],
  },
} satisfies MetricTemplate
