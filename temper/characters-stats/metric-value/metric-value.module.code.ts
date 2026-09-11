import type { Metric } from "akasha/temper/characters-stats/metrics/metrics.module.code.ts"

export type MetricValue = Metric & {
  value: number
}
