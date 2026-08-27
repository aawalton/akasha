import type { MetricTemplate } from "../metric-template"

export const statusPoisonWeaponDamageMetric = {
  id: "status-poison-weapon-damage",

  name: "Status Poison Weapon Damage",
  valueType: "integer",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: {
    type: "metric-refs",
    metricIds: ["power-weapon"],
  },
} satisfies MetricTemplate
