import type { Metric } from "./metrics.generated"


export type MetricValue = Metric & {
  value: number
}
