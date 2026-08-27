import type { MetricTemplate } from "../metric-template"

export const laShockWeaponDamageMetric = {
  id: "la-shock-weapon-damage",

  name: "LA Shock Weapon Damage",
  valueType: "integer",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: {
    type: "metric-refs",
    metricIds: ["power-weapon"],
  },
} satisfies MetricTemplate
