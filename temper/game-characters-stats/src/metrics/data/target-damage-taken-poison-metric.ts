import type { MetricTemplate } from "../metric-template"

export const targetDamageTakenPoisonMetric = {
  id: "target-damage-taken-poison",

  name: "Target Damage Taken (Poison)",
  valueType: "number-per-second",
  polarity: "higher-is-better",
  fullyImplemented: true,
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
