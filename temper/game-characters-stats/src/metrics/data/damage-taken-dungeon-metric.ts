import type { MetricTemplate } from "../metric-template"

export const damageTakenDungeonMetric = {
  id: "damage-taken-dungeon",

  name: "Damage Taken (Dungeon)",
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
