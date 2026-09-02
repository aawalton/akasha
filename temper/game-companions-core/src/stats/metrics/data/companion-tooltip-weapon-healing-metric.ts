import type { CompanionMetricTemplate } from "@akasha/temper-companions-core/companion-metric-template"

export const companionTooltipWeaponHealingMetric = {
  id: "companion-tooltip-weapon-healing",
  name: "Tooltip Weapon Healing",
  valueType: "integer",
  formula: {
    type: "multiply",
    operands: [
      { type: "metric-ref", metricId: "companion-weapon-damage" },
      {
        type: "add",
        operands: [
          { type: "constant", value: 1 },
          { type: "metric-ref", metricId: "companion-healing-done" },
        ],
      },
    ],
  },
} satisfies CompanionMetricTemplate
