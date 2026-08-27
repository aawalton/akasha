import type { MetricTemplate } from "../metric-template"

export const statusBleedWeaponDamageMetric = {
  id: "status-bleed-weapon-damage",

  name: "Status Bleed Weapon Damage",
  valueType: "integer",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: {
    type: "metric-refs",
    metricIds: ["power-weapon"],
  },
} satisfies MetricTemplate
