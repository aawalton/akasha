import type { MetricId } from "@akasha/temper-formula-framework/metric-id"
import type { MetricValue } from "@temper/game-characters-stats/metrics/types"

export type StatsRecord = Partial<Record<MetricId, MetricValue>>
