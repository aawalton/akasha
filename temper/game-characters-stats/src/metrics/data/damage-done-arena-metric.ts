import type { MetricTemplate } from "../metric-template"

export const damageDoneArenaMetric = {
  id: "damage-done-arena",

  name: "Damage Done (Arena)",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: {
    type: "sum",
    effectType: "fractional-change",
  },
} satisfies MetricTemplate
