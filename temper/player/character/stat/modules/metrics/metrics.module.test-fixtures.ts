import { akashaRoot } from "akasha/page/modules/checkout-roots/checkout-roots.module.code.ts"
import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import { asking } from "akasha/page/service/modules/page-asking/page-asking.module.code.ts"
import {
  holdMetricCatalogOf,
  METRIC_CATALOG_READS,
} from "akasha/temper/player/character/stat/modules/metric-catalog-loading/metric-catalog-loading.module.code.ts"
import type { MetricCatalog } from "akasha/temper/player/character/stat/modules/metrics/metrics.module.code.ts"

export function holdMetricCatalogFromCheckout(): MetricCatalog {
  const byType = new Map<string, readonly Value[]>()
  for (const [pageTypeSlug, keys] of METRIC_CATALOG_READS) {
    const answered = asking(akashaRoot(), { pageTypeSlug, keys } as never)
    if ("refused" in answered) throw new Error(answered.refused)
    byType.set(pageTypeSlug, answered.rows as readonly Value[])
  }
  return holdMetricCatalogOf((pageTypeSlug) => byType.get(pageTypeSlug) ?? [])
}
