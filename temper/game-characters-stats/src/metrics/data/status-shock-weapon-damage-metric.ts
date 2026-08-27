import type { MetricTemplate } from "../metric-template"

export const statusShockWeaponDamageMetric = {
  id: "status-shock-weapon-damage",

  name: "Status Shock Weapon Damage",
  valueType: "integer",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: {
    type: "metric-refs",
    metricIds: ["power-weapon"],
  },
} satisfies MetricTemplate
