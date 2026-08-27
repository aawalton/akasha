import type { MetricTemplate } from "../metric-template"

export const damageDonePlayersMetric = {
  id: "damage-done-players",

  name: "Damage Done (Players)",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: {
    type: "sum",
    effectType: "fractional-change",
  },
} satisfies MetricTemplate
