import type { CompanionMetricTemplate } from "@akasha/temper-companions-core/companion-metric-template"

export const companionRollDodgeCooldownMetric = {
  id: "companion-roll-dodge-cooldown",
  name: "Roll Dodge CD",
  valueType: "integer",
  formula: {
    type: "multiply",
    operands: [
      { type: "sum", metricId: "companion-roll-dodge-cooldown", effectType: "integer" },
      {
        type: "add",
        operands: [
          { type: "constant", value: 1 },
          {
            type: "sum",
            metricId: "companion-roll-dodge-cooldown",
            effectType: "fractional-change",
          },
        ],
      },
    ],
  },
} satisfies CompanionMetricTemplate
