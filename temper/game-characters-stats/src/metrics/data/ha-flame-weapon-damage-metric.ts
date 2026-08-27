import type { MetricTemplate } from "../metric-template"

export const haFlameWeaponDamageMetric = {
  id: "ha-flame-weapon-damage",

  name: "HA Flame Weapon Damage",
  valueType: "integer",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: {
    type: "metric-refs",
    metricIds: ["power-weapon"],
  },
} satisfies MetricTemplate
