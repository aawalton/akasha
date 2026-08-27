import type { MetricTemplate } from "../metric-template"

export const statusMagicWeaponDamageMetric = {
  id: "status-magic-weapon-damage",

  name: "Status Magic Weapon Damage",
  valueType: "integer",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: {
    type: "metric-refs",
    metricIds: ["power-weapon"],
  },
} satisfies MetricTemplate
