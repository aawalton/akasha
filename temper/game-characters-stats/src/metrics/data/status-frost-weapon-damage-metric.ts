import type { MetricTemplate } from "../metric-template"

export const statusFrostWeaponDamageMetric = {
  id: "status-frost-weapon-damage",

  name: "Status Frost Weapon Damage",
  valueType: "integer",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: {
    type: "metric-refs",
    metricIds: ["power-weapon"],
  },
} satisfies MetricTemplate
