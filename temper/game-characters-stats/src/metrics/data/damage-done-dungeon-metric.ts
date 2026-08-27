import type { MetricTemplate } from "../metric-template"

export const damageDoneDungeonMetric = {
  id: "damage-done-dungeon",

  name: "Damage Done (Dungeon)",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: {
    type: "sum",
    effectType: "fractional-change",
  },
} satisfies MetricTemplate
