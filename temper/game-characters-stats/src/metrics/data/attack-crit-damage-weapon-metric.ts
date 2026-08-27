import type { MetricTemplate } from "../metric-template"

export const attackCritDamageWeaponMetric = {
  id: "attack-crit-damage-weapon",

  name: "Attack Weapon Critical Damage",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  formula: {
    type: "add",
    operands: [
      { type: "metric-refs", metricIds: ["critical-damage-weapon"] },
      {
        type: "multiply",
        operands: [
          { type: "constant", value: -1 },
          {
            type: "metric-refs",
            metricIds: ["target-critical-resistance"],
            convertRatingToChance: true,
          },
        ],
      },
    ],
  },
  fullyImplemented: true,
} satisfies MetricTemplate
