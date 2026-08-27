import type { MetricTemplate } from "../metric-template"

export const statusPhysicalWeaponDamageMetric = {
  id: "status-physical-weapon-damage",

  name: "Status Physical Weapon Damage",
  valueType: "integer",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: {
    type: "metric-refs",
    metricIds: ["power-weapon"],
  },
} satisfies MetricTemplate
