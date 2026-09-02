import type { CompanionMetricTemplate } from "@akasha/temper-companions-core/companion-metric-template"

export const companionArmorMetric = {
  id: "companion-armor",
  name: "Armor",
  valueType: "rating",
  divisor: 50000,
  cap: 0.5,
  formula: {
    type: "multiply",
    operands: [
      { type: "sum", metricId: "companion-armor", effectType: "integer" },
      {
        type: "add",
        operands: [
          { type: "constant", value: 1 },
          { type: "sum", metricId: "companion-armor", effectType: "fractional-change" },
        ],
      },
    ],
  },
} satisfies CompanionMetricTemplate
