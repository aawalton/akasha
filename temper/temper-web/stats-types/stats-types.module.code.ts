import type { MetricId } from "@akasha/temper-formula-framework/metric-id"
import type { MetricValue } from "akasha/temper/temper-characters-stats/metric-value/metric-value.module.code.ts"

export type StatsRecord = Partial<Record<MetricId, MetricValue>>
