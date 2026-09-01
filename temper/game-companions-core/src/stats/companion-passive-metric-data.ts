import { createDataFile } from "@akasha/utils-narrow/create-data-file"
import { TEMPER_COMPANION_PASSIVE_METRICS } from "../generated/temper-companion-passive-metric.generated"

export interface CompanionPassiveMetricTemplate {
  id: string
  name: string
}

export const companionPassiveMetrics = createDataFile<CompanionPassiveMetricTemplate>()(
  TEMPER_COMPANION_PASSIVE_METRICS
)
