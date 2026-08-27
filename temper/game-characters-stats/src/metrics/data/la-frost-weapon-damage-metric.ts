import type { MetricTemplate } from "../metric-template"

export const laFrostWeaponDamageMetric = {
  id: "la-frost-weapon-damage",

  name: "LA Frost Weapon Damage",
  valueType: "integer",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: {
    type: "metric-refs",
    metricIds: ["power-weapon"],
  },
} satisfies MetricTemplate
