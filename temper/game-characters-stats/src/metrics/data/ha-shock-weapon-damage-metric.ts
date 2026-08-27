import type { MetricTemplate } from "../metric-template"

export const haShockWeaponDamageMetric = {
  id: "ha-shock-weapon-damage",

  name: "HA Shock Weapon Damage",
  valueType: "integer",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: {
    type: "metric-refs",
    metricIds: ["power-weapon"],
  },
} satisfies MetricTemplate
