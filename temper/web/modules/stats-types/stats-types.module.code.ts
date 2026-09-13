import type { MetricValue } from "akasha/temper/characters-stats/modules/metric-value/metric-value.module.code.ts"
import type { MetricId } from "akasha/temper/formula-framework/modules/metric-id/metric-id.module.code.ts"

export type StatsRecord = Partial<Record<MetricId, MetricValue>>
