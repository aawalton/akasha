import { getPages } from "akasha/page/access/modules/get/get.module.code.ts"
import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import {
  companionMetricGroupsOf,
  holdCompanionMetricGroups,
} from "akasha/temper/catalog/companion/companions-core/modules/companion-metric-tree/companion-metric-tree.module.code.ts"
import {
  companionMetricCatalogOf,
  holdCompanionMetricCatalog,
} from "akasha/temper/catalog/companion/companions-core/modules/companion-metrics/companion-metrics.module.code.ts"
import { temperTargetArmor } from "akasha/temper/catalog/effect/temper-target-armor/temper-target-armor.page-type.ts"
import { temperVampireStage } from "akasha/temper/catalog/effect/temper-vampire-stage/temper-vampire-stage.page-type.ts"
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
  holdVampireStageEffects,
  vampireStageEffectsOf,
} from "akasha/temper/player/character/source/modules/curse-source/curse-source.module.code.ts"
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

const EVERY = 5000

export const METRIC_CATALOG_READS: readonly (readonly [string, readonly string[]])[] = [
  [temperSourceCategory.slug, ["slug", "title", "displayOrder", "subject", "wornGear"]],
  [temperBaseStat.slug, ["slug", "metric", "effectType", "value"]],
  [temperTarget.slug, ["slug", "title", "effects"]],
  [temperTargetArmor.slug, ["slug", "key", "title", "armor", "defaultTarget"]],
  [
    temperMetricTree.slug,
    [
      "slug",
      "title",
      "nodeId",
      "nodeType",
      "displayOrder",
      "parent",
      "includeInChildAggregates",
      "useAccentColor",
    ],
  ],
  [temperVampireStage.slug, ["slug", "key", "effects"]],
  [
    temperMetric.slug,
    [
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
      "subject",
      "effectType",
      "valueSource",
      "ratingFloorIncrement",
    ],
  ],
]

export function holdMetricCatalogOf(
  rowsOf: (pageTypeSlug: string) => readonly Value[]
): MetricCatalog {
  holdSourceCategories(sourceCategoriesOf(rowsOf(temperSourceCategory.slug)))
  holdBaseStats(baseStatsOf(rowsOf(temperBaseStat.slug)))
  holdTarget(targetOf(rowsOf(temperTarget.slug)))
  holdTargetArmors(targetArmorsOf(rowsOf(temperTargetArmor.slug)))
  const nodes = rowsOf(temperMetricTree.slug)
  holdMetricTree(metricTreeOf(nodes))
  holdCompanionMetricGroups(companionMetricGroupsOf(nodes))
  holdVampireStageEffects(vampireStageEffectsOf(rowsOf(temperVampireStage.slug), nodes))
  const stats = rowsOf(temperMetric.slug)
  holdCompanionMetricCatalog(companionMetricCatalogOf(stats, FORMULAS))
  return holdMetricCatalog(metricCatalogOf(metricTemplatesOf(stats, FORMULAS)))
}

export async function loadMetricCatalog(): Promise<MetricCatalog> {
  const answered = await Promise.all(
    METRIC_CATALOG_READS.map(async ([pageTypeSlug, select]) => {
      const { rows } = await getPages({ pageTypeSlug, select: [...select], limit: EVERY })
      return [pageTypeSlug, rows] as const
    })
  )
  const byType = new Map<string, readonly Value[]>(answered)
  return holdMetricCatalogOf((pageTypeSlug) => byType.get(pageTypeSlug) ?? [])
}
