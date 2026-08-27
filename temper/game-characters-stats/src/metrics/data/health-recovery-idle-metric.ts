import type { MetricTemplate } from "../metric-template"

export const healthRecoveryIdleMetric = {
  id: "health-recovery-idle",

  name: "Health Recovery (Idle)",
  category: "base",
  esoStatConstantName: "STAT_HEALTH_REGEN_IDLE",
  valueType: "integer",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: {
    type: "multiply",
    operands: [
      { type: "metric-refs", metricIds: ["health-recovery"] },
      { type: "constant", value: 4 },
    ],
  },
} satisfies MetricTemplate
