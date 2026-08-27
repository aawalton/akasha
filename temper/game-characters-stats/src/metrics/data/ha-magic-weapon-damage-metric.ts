import type { MetricTemplate } from "../metric-template"

export const haMagicWeaponDamageMetric = {
  id: "ha-magic-weapon-damage",

  name: "HA Magic Weapon Damage",
  valueType: "integer",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: {
    type: "metric-refs",
    metricIds: ["power-weapon"],
  },
} satisfies MetricTemplate
