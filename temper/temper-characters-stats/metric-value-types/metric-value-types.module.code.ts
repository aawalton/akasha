interface MetricValueTypeInterface {
  id: string
  name: string
  description: string
  unit?: string
  formatValue?: (value: number) => string
}

const METRIC_VALUE_TYPES = {
  integer: {
    id: "integer",
    name: "Integer",
    description: "Whole number values for stats like power, maximum resources, and ratings",
    formatValue: (value: number) => Math.floor(value).toString(),
  },
  rating: {
    id: "rating",
    name: "Rating",
    description:
      "Integer rating values that convert to a percentage using a divisor stored on the metric",
    formatValue: (value: number) => Math.floor(value).toString(),
  },
  "fractional-change": {
    id: "fractional-change",
    name: "Fractional Change",
    description: "Fractional-change values for modifiers, costs, and damage done",
    formatValue: (value: number) => `${(value * 100).toFixed(2)}%`,
  },
  "number-per-second": {
    id: "number-per-second",
    name: "Per Second",
    description: "Rate-based values like recovery and restore effects",
    formatValue: (value: number) => `${value.toFixed(1)}/sec`,
  },
} satisfies Record<string, MetricValueTypeInterface>

export type MetricValueType = keyof typeof METRIC_VALUE_TYPES
