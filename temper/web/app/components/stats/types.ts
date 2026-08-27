import type { MetricId } from "@temper/shared-formula-framework/metric-ids.generated"
import type { MetricValue } from "@temper/game-characters-stats/metrics/types"

export type StatsRecord = Partial<Record<MetricId, MetricValue>>
