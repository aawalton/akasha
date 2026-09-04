import type { MetricValue } from "@akasha/temper-characters-stats/metric-value"
import type { MetricId } from "@akasha/temper-formula-framework/metric-id"

export type StatsRecord = Partial<Record<MetricId, MetricValue>>
