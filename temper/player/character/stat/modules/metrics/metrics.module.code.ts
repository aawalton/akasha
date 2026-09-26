import {
  createDataFile,
  type DataFile,
} from "akasha/code/type/narrowing/modules/create-data-file/create-data-file.module.code.ts"
import type { MetricId } from "akasha/temper/player/character/formula-framework/modules/metric-id/metric-id.module.code.ts"
import type { MetricTemplate } from "akasha/temper/player/character/stat/modules/metric-template/metric-template.module.code.ts"

export type MetricCatalog = DataFile<MetricId, MetricTemplate>

export type Metric = MetricTemplate & { id: MetricId }

export type MetricWithFormula = Metric & {
  formula: NonNullable<MetricTemplate["formula"]>
}

const UNREAD =
  "the stat catalogue is read from pages, and nothing has read it yet — gate the screen on `MetricCatalogGate`, or hold it before the work starts"

class MetricCatalogUnread extends Error {
  constructor() {
    super(UNREAD)
    this.name = "MetricCatalogUnread"
  }
}

function keyedById(templates: readonly MetricTemplate[]): Record<MetricId, MetricTemplate> {
  const keyed: Partial<Record<MetricId, MetricTemplate>> = {}
  for (const one of templates) keyed[one.id] = one
  return keyed as Record<MetricId, MetricTemplate>
}

export function metricCatalogOf(templates: readonly MetricTemplate[]): MetricCatalog {
  return createDataFile<MetricTemplate>()(keyedById(templates))
}

let held: MetricCatalog | null = null

const WITH_FORMULAS = new WeakMap<MetricCatalog, readonly MetricWithFormula[]>()

export function holdMetricCatalog(catalog: MetricCatalog): MetricCatalog {
  held = catalog
  return catalog
}

export function metrics(): MetricCatalog {
  if (held === null) throw new MetricCatalogUnread()
  return held
}

export function metricsWithFormulas(): readonly MetricWithFormula[] {
  const catalog = metrics()
  const already = WITH_FORMULAS.get(catalog)
  if (already !== undefined) return already
  const found = catalog.list.filter(hasFormula)
  WITH_FORMULAS.set(catalog, found)
  return found
}

export function getMetricDisplayName(metricId: MetricId): string {
  return metrics().data[metricId].name
}

export function hasFormula(
  metric: MetricTemplate
): metric is MetricTemplate & { formula: NonNullable<MetricTemplate["formula"]> } {
  return metric.formula !== undefined
}
