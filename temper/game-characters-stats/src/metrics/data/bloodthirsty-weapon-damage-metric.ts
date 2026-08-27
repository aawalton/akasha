import type { MetricTemplate } from "../metric-template"

export const bloodthirstyWeaponDamageMetric = {
  id: "bloodthirsty-weapon-damage",

  name: "Bloodthirsty Weapon Damage",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  fullyImplemented: false,
  formula: {
    type: "metric-refs",
    metricIds: ["bloodthirsty"],
  },
} satisfies MetricTemplate
