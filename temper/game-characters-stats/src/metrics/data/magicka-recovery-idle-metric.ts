import type { MetricTemplate } from "../metric-template"

export const magickaRecoveryIdleMetric = {
  id: "magicka-recovery-idle",

  name: "Magicka Recovery (Idle)",
  category: "base",
  esoStatConstantName: "STAT_MAGICKA_REGEN_IDLE",
  valueType: "integer",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: {
    type: "multiply",
    operands: [
      { type: "sum-for-metric", metricId: "magicka-recovery", effectType: "integer" },
      {
        type: "add",
        operands: [
          { type: "constant", value: 1 },
          {
            type: "sum-for-metric",
            metricId: "magicka-recovery",
            effectType: "fractional-change",
          },
        ],
      },
      { type: "constant", value: 2 },
    ],
  },
} satisfies MetricTemplate
