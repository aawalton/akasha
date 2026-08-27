import type { MetricTemplate } from "../metric-template"

export const healingCriticalBonusWeaponMetric = {
  id: "healing-critical-bonus-weapon",

  name: "Weapon Critical Healing Bonus",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: {
    type: "multiply",
    operands: [
      {
        type: "add",
        operands: [
          {
            type: "sum",
            effectType: "fractional-change",
          },
          { type: "constant", value: 0.5 },
        ],
      },
      {
        type: "add",
        operands: [{ type: "constant", value: 1 }],
      },
    ],
  },
} satisfies MetricTemplate
