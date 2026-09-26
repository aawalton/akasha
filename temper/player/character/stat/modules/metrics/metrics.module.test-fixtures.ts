import { akashaRoot } from "akasha/page/modules/checkout-roots/checkout-roots.module.code.ts"
import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import { asking } from "akasha/page/service/modules/page-asking/page-asking.module.code.ts"
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

const METRIC_FIELDS: readonly string[] = [
  "slug",
  "title",
  "category",
  "valueType",
  "polarity",
  "esoStatConstantName",
  "esoStatValuePart",
  "divisor",
  "cap",
  "fullyImplemented",
]

const TREE_FIELDS: readonly string[] = [
  "slug",
  "title",
  "nodeId",
  "nodeType",
  "displayOrder",
  "parent",
  "includeInChildAggregates",
  "useAccentColor",
]

export function holdMetricCatalogFromCheckout(): MetricCatalog {
  const nodes = asking(akashaRoot(), {
    pageTypeSlug: temperMetricTree.slug,
    keys: TREE_FIELDS,
  } as never)
  if ("refused" in nodes) throw new Error(nodes.refused)
  holdMetricTree(metricTreeOf(nodes.rows as readonly Value[]))
  const stats = asking(akashaRoot(), {
    pageTypeSlug: temperMetric.slug,
    keys: METRIC_FIELDS,
  } as never)
  if ("refused" in stats) throw new Error(stats.refused)
  return holdMetricCatalog(
    metricCatalogOf(metricTemplatesOf(stats.rows as readonly Value[], FORMULAS))
  )
}
