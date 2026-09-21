import type { Metric } from "akasha/temper/player/character/stat/modules/metrics/metrics.module.code.ts"

export type MetricValue = Metric & {
  value: number
}
