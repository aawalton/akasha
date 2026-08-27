import type { MetricTemplate } from "../metric-template"

export const laPhysicalWeaponDamageMetric = {
  id: "la-physical-weapon-damage",

  name: "LA Physical Weapon Damage",
  valueType: "integer",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: {
    type: "metric-refs",
    metricIds: ["power-weapon"],
  },
} satisfies MetricTemplate
