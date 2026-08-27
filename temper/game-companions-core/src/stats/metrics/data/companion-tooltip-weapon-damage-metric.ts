import type { CompanionMetricTemplate } from "../companion-metric-template"

export const companionTooltipWeaponDamageMetric = {
  id: "companion-tooltip-weapon-damage",
  name: "Tooltip Weapon Damage",
  valueType: "integer",
  formula: {
    type: "multiply",
    operands: [
      { type: "metric-ref", metricId: "companion-weapon-damage" },
      {
        type: "add",
        operands: [
          { type: "constant", value: 1 },
          { type: "metric-ref", metricId: "companion-damage-done" },
        ],
      },
    ],
  },
} satisfies CompanionMetricTemplate
