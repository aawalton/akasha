import type { MetricTemplate } from "../metric-template"

export const damageDoneChanneledMetric = {
  id: "damage-done-channeled",

  name: "Damage Done (Channeled)",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: {
    type: "sum",
    effectType: "fractional-change",
  },
} satisfies MetricTemplate
