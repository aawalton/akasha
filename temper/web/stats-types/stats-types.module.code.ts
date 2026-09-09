import type { MetricValue } from "akasha/temper/characters-stats/metric-value/metric-value.module.code.ts"
import type { MetricId } from "../../formula-framework/metric-id/metric-id.module.code.ts"

export type StatsRecord = Partial<Record<MetricId, MetricValue>>
