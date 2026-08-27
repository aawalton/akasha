import type { MetricTemplate } from "../metric-template"

export const damageTakenArenaMetric = {
  id: "damage-taken-arena",

  name: "Damage Taken (Arena)",
  valueType: "fractional-change",
  polarity: "lower-is-better",
  fullyImplemented: true,
  formula: {
    type: "add",
    operands: [
      {
        type: "sum",
        effectType: "fractional-change",
      },
    ],
  },
} satisfies MetricTemplate
