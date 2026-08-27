import type { MetricTemplate } from "../metric-template"

export const potionCooldownMetric = {
  id: "potion-cooldown",

  name: "Potion Cooldown",
  valueType: "integer",
  polarity: "lower-is-better",
  formula: {
    type: "add",
    operands: [
      {
        type: "sum",
        effectType: "integer",
      },
    ],
  },
  fullyImplemented: true,
} satisfies MetricTemplate
