import type { MetricTemplate } from "../metric-template"

export const staminaRecoveryIdleMetric = {
  id: "stamina-recovery-idle",

  name: "Stamina Recovery (Idle)",
  category: "base",
  esoStatConstantName: "STAT_STAMINA_REGEN_IDLE",
  valueType: "integer",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: {
    type: "multiply",
    operands: [
      { type: "sum-for-metric", metricId: "stamina-recovery", effectType: "integer" },
      {
        type: "add",
        operands: [
          { type: "constant", value: 1 },
          {
            type: "sum-for-metric",
            metricId: "stamina-recovery",
            effectType: "fractional-change",
          },
        ],
      },
      { type: "constant", value: 2 },
    ],
  },
} satisfies MetricTemplate
