import type { MetricTemplate } from "../metric-template"

export const haFrostWeaponDamageMetric = {
  id: "ha-frost-weapon-damage",

  name: "HA Frost Weapon Damage",
  valueType: "integer",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: {
    type: "metric-refs",
    metricIds: ["power-weapon"],
  },
} satisfies MetricTemplate
