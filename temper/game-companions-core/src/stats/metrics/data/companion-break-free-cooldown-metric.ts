import type { CompanionMetricTemplate } from "@akasha/temper-companions-core/companion-metric-template"

export const companionBreakFreeCooldownMetric = {
  id: "companion-break-free-cooldown",
  name: "Break Free CD",
  valueType: "integer",
  formula: {
    type: "multiply",
    operands: [
      { type: "sum", metricId: "companion-break-free-cooldown", effectType: "integer" },
      {
        type: "add",
        operands: [
          { type: "constant", value: 1 },
          {
            type: "sum",
            metricId: "companion-break-free-cooldown",
            effectType: "fractional-change",
          },
        ],
      },
    ],
  },
} satisfies CompanionMetricTemplate
