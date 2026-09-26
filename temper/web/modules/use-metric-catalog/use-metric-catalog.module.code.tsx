"use client"

import { usePages } from "akasha/page/ui/supabase/modules/use-pages/use-pages.module.code.ts"
import {
  companionMetricGroupsOf,
  holdCompanionMetricGroups,
} from "akasha/temper/catalog/companion/companions-core/modules/companion-metric-tree/companion-metric-tree.module.code.ts"
import {
  companionMetricCatalogOf,
  holdCompanionMetricCatalog,
} from "akasha/temper/catalog/companion/companions-core/modules/companion-metrics/companion-metrics.module.code.ts"
import { temperTargetArmor } from "akasha/temper/catalog/effect/temper-target-armor/temper-target-armor.page-type.ts"
import { temperSourceCategory } from "akasha/temper/catalog/world/temper-source-category/temper-source-category.page-type.ts"
import {
  holdSourceCategories,
  sourceCategoriesOf,
} from "akasha/temper/player/character/formula-framework/modules/source-category/source-category.module.code.ts"
import {
  baseStatsOf,
  holdBaseStats,
} from "akasha/temper/player/character/source/modules/base-source/base-source.module.code.ts"
import {
  holdTargetArmors,
  targetArmorsOf,
} from "akasha/temper/player/character/source/modules/target-armors/target-armors.module.code.ts"
import {
  holdTarget,
  targetOf,
} from "akasha/temper/player/character/source/modules/target-source/target-source.module.code.ts"
import { temperBaseStat } from "akasha/temper/player/character/source/temper-base-stat/temper-base-stat.page-type.ts"
import { temperTarget } from "akasha/temper/player/character/source/temper-target/temper-target.page-type.ts"
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
import { createContext, useContext, useMemo } from "react"

const EVERY = 1000

export const metricCatalogContext = createContext<MetricCatalog | null>(null)

export function useHeldMetricCatalog(): MetricCatalog | null {
  return useContext(metricCatalogContext)
}

export function useMetricCatalog(): MetricCatalog | null {
  const stats = usePages({ pageTypeSlug: temperMetric.slug, limit: EVERY })
  const nodes = usePages({ pageTypeSlug: temperMetricTree.slug, limit: EVERY })
  const categories = usePages({ pageTypeSlug: temperSourceCategory.slug, limit: EVERY })
  const bases = usePages({ pageTypeSlug: temperBaseStat.slug, limit: EVERY })
  const targets = usePages({ pageTypeSlug: temperTarget.slug, limit: EVERY })
  const armors = usePages({ pageTypeSlug: temperTargetArmor.slug, limit: EVERY })
  const read = [stats, nodes, categories, bases, targets, armors]
  const failed = read.find((one) => one.error !== null)?.error ?? null
  const loading = read.some((one) => one.isLoading)
  const catalog = useMemo(() => {
    if (loading) return null
    holdSourceCategories(sourceCategoriesOf(categories.rows))
    holdBaseStats(baseStatsOf(bases.rows))
    holdTarget(targetOf(targets.rows))
    holdTargetArmors(targetArmorsOf(armors.rows))
    holdMetricTree(metricTreeOf(nodes.rows))
    holdCompanionMetricGroups(companionMetricGroupsOf(nodes.rows))
    holdCompanionMetricCatalog(companionMetricCatalogOf(stats.rows, FORMULAS))
    return holdMetricCatalog(metricCatalogOf(metricTemplatesOf(stats.rows, FORMULAS)))
  }, [loading, stats.rows, nodes.rows, categories.rows, bases.rows, targets.rows, armors.rows])
  if (failed !== null) throw failed
  return catalog
}
