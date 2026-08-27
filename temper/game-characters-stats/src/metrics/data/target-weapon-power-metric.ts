import type { MetricTemplate } from "../metric-template"

export const targetWeaponPowerMetric = {
  id: "target-weapon-power",

  name: "Target Weapon Power",
  valueType: "integer",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: {
    type: "add",
    operands: [
      {
        type: "sum",
        effectType: "integer",
      },
    ],
  },
} satisfies MetricTemplate
