import type { MetricTemplate } from "../metric-template"

export const statusFlameWeaponDamageMetric = {
  id: "status-flame-weapon-damage",

  name: "Status Flame Weapon Damage",
  valueType: "integer",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: {
    type: "metric-refs",
    metricIds: ["power-weapon"],
  },
} satisfies MetricTemplate
