import type { CompanionMetricId } from "akasha/temper/companions-core/modules/companion-metric-ids/companion-metric-ids.module.code.ts"
import type { CompanionMetricTemplate } from "akasha/temper/companions-core/modules/companion-metric-template/companion-metric-template.module.code.ts"
import { COMPANION_METRICS_00 } from "akasha/temper/companions-core/modules/companion-metrics-00/companion-metrics-00.module.code.ts"
import { COMPANION_METRICS_01 } from "akasha/temper/companions-core/modules/companion-metrics-01/companion-metrics-01.module.code.ts"
import { COMPANION_METRICS_02 } from "akasha/temper/companions-core/modules/companion-metrics-02/companion-metrics-02.module.code.ts"
import type { RatingSurplusInfo } from "akasha/temper/formula-framework/rating-chance/rating-chance.module.code.ts"
import type { SourceCategoryId } from "akasha/temper/formula-framework/source-category/source-category.module.code.ts"
import { createDataFile } from "akasha/utils/narrow/create-data-file/create-data-file.module.code.ts"

export const COMPANION_CATEGORIES: SourceCategoryId[] = [
  "companion-base",
  "companion-armor",
  "companion-weapons",
  "companion-jewelry",
  "companion-skills",
]

const COMPANION_METRICS_DATA: Record<CompanionMetricId, CompanionMetricTemplate> = {
  ...COMPANION_METRICS_00,
  ...COMPANION_METRICS_01,
  ...COMPANION_METRICS_02,
}

export const companionMetrics = createDataFile<CompanionMetricTemplate>()(COMPANION_METRICS_DATA)

type CompanionMetric = CompanionMetricTemplate & { id: CompanionMetricId }

export type CompanionMetricValue = CompanionMetric & { value: number; surplus?: RatingSurplusInfo }

export function getCompanionMetricName(metricId: CompanionMetricId): string {
  return COMPANION_METRICS_DATA[metricId].name
}
