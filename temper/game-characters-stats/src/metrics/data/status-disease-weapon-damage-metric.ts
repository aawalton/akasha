import type { MetricTemplate } from "../metric-template"

export const statusDiseaseWeaponDamageMetric = {
  id: "status-disease-weapon-damage",

  name: "Status Disease Weapon Damage",
  valueType: "integer",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: {
    type: "metric-refs",
    metricIds: ["power-weapon"],
  },
} satisfies MetricTemplate
