import type { Metric } from "akasha/temper/character-stat/modules/metrics/metrics.module.code.ts"

export type MetricValue = Metric & {
  value: number
}
