"use client"

import { usePages } from "akasha/page/ui/supabase/modules/use-pages/use-pages.module.code.ts"
import { FORMULAS } from "akasha/temper/player/character/stat/modules/metric-formula-files/metric-formula-files.module.code.ts"
import { metricTemplatesOf } from "akasha/temper/player/character/stat/modules/metric-reading/metric-reading.module.code.ts"
import {
  holdMetricTree,
  metricTreeOf,
} from "akasha/temper/player/character/stat/modules/metric-tree/metric-tree.module.code.ts"
import {
  holdMetricCatalog,
  type MetricCatalog,
  metricCatalogOf,
} from "akasha/temper/player/character/stat/modules/metrics/metrics.module.code.ts"
import { temperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.ts"
import { temperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.ts"
import { useMemo } from "react"

const EVERY = 1000

export function useMetricCatalog(): MetricCatalog | null {
  const stats = usePages({ pageTypeSlug: temperMetric.slug, limit: EVERY })
  const nodes = usePages({ pageTypeSlug: temperMetricTree.slug, limit: EVERY })
  const failed = stats.error ?? nodes.error ?? null
  const loading = stats.isLoading || nodes.isLoading
  const catalog = useMemo(() => {
    if (loading) return null
    holdMetricTree(metricTreeOf(nodes.rows))
    return holdMetricCatalog(metricCatalogOf(metricTemplatesOf(stats.rows, FORMULAS)))
  }, [loading, stats.rows, nodes.rows])
  if (failed !== null) throw failed
  return catalog
}
