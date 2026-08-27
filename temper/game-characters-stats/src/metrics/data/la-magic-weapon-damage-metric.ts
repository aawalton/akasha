import type { MetricTemplate } from "../metric-template"

export const laMagicWeaponDamageMetric = {
  id: "la-magic-weapon-damage",

  name: "LA Magic Weapon Damage",
  valueType: "integer",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: {
    type: "metric-refs",
    metricIds: ["power-weapon"],
  },
} satisfies MetricTemplate
