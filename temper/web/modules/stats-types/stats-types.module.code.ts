import type { MetricId } from "akasha/temper/player/character/formula-framework/modules/metric-id/metric-id.module.code.ts"
import type { MetricValue } from "akasha/temper/player/character/stat/modules/metric-value/metric-value.module.code.ts"

export type StatsRecord = Partial<Record<MetricId, MetricValue>>
