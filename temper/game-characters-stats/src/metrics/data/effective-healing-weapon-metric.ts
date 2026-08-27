import type { MetricTemplate } from "../metric-template"

export const effectiveHealingWeaponMetric = {
  id: "effective-healing-weapon",

  name: "Effective Weapon Healing Power",
  valueType: "integer",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: {
    type: "multiply",
    operands: [
      {
        type: "add",
        operands: [
          {
            type: "multiply",
            operands: [
              { type: "metric-refs", metricIds: ["stamina-maximum"] },
              { type: "constant", value: 0.095238 },
            ],
          },
          { type: "metric-refs", metricIds: ["power-weapon"] },
        ],
      },
      {
        type: "add",
        operands: [
          { type: "constant", value: 1 },
          {
            type: "multiply",
            operands: [
              {
                type: "metric-refs",
                metricIds: ["critical-rating-weapon"],
                convertRatingToChance: true,
              },
              { type: "metric-refs", metricIds: ["healing-critical-bonus-weapon"] },
            ],
          },
        ],
      },
      {
        type: "add",
        operands: [
          { type: "constant", value: 1 },
          { type: "metric-refs", metricIds: ["target-healing-received"] },
        ],
      },
      {
        type: "add",
        operands: [
          { type: "constant", value: 1 },
          { type: "metric-refs", metricIds: ["healing-done-base"] },
        ],
      },
    ],
  },
} satisfies MetricTemplate
