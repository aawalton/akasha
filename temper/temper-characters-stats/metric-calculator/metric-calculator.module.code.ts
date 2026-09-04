import { indexBy } from "@akasha/temper-build-support/row-grouping"
import type { CharacterState } from "@akasha/temper-character-build/build-types"
import { base } from "@akasha/temper-character-sources/base-source"
import type { EffectSource } from "@akasha/temper-formula-framework/effect-source"
import type { MetricId } from "@akasha/temper-formula-framework/metric-id"
import { topologicalSort } from "@akasha/temper-formula-framework/topological-sort"
import { calculateBuffs } from "../buff-or-debuff-calculator/buff-or-debuff-calculator.module.code.ts"
import { buildStateToEffectSources } from "../build-state-adapter/build-state-adapter.module.code.ts"
import type { FormulaNode } from "../formula-types/formula-types.module.code.ts"
import {
  evaluateFormula,
  roundMetricValue,
} from "../metric-formulas/metric-formulas.module.code.ts"
import type { MetricValue } from "../metric-value/metric-value.module.code.ts"
import {
  hasFormula,
  type MetricWithFormula,
  metrics,
  metricsWithFormulas,
} from "../metrics/metrics.module.code.ts"

export interface CalculationResult {
  sources: readonly EffectSource[]
  metrics: Partial<Record<MetricId, MetricValue>>
}

function extractMetricReferences(node: FormulaNode): Set<MetricId> {
  const refs = new Set<MetricId>()

  if (node.type === "metric-refs") {
    for (const metricIdStr of node.metricIds) {
      if (metrics.has(metricIdStr)) {
        refs.add(metricIdStr)
      }
    }
  } else if (
    node.type === "add" ||
    node.type === "multiply" ||
    node.type === "divide" ||
    node.type === "max" ||
    node.type === "min" ||
    node.type === "floor-multiply"
  ) {
    for (const operand of node.operands) {
      for (const ref of extractMetricReferences(operand)) {
        refs.add(ref)
      }
    }
  } else if (node.type === "floor" || node.type === "floor-product") {
    for (const ref of extractMetricReferences(node.operand)) {
      refs.add(ref)
    }
  }

  return refs
}

function buildDependencyGraph(metrics: readonly MetricWithFormula[]): Map<MetricId, Set<MetricId>> {
  const graph = new Map<MetricId, Set<MetricId>>()

  for (const metric of metrics) {
    const deps = extractMetricReferences(metric.formula)
    graph.set(metric.id, deps)
  }

  return graph
}

function calculateBaseStats(
  sources: readonly EffectSource[]
): Partial<Record<MetricId, MetricValue>> {
  const dependencies = buildDependencyGraph(metricsWithFormulas)

  const allReferencedMetricIds = new Set<MetricId>()
  for (const deps of dependencies.values()) {
    for (const dep of deps) {
      allReferencedMetricIds.add(dep)
    }
  }

  const metricValues = new Map<MetricId, number>()
  for (const metricId of allReferencedMetricIds) {
    if (metrics.has(metricId)) {
      const metric = metrics.data[metricId]
      if (!hasFormula(metric)) {
        metricValues.set(metricId, 0)
      }
    }
  }

  const calculationOrder = topologicalSort(
    metricsWithFormulas,
    (metric) => metric.id,
    (metric) => dependencies.get(metric.id) ?? new Set()
  )

  const results: MetricValue[] = []

  for (const metric of calculationOrder) {
    const rawValue = evaluateFormula(metric, sources, metricValues)
    metricValues.set(metric.id, rawValue)

    const value = roundMetricValue(metric, rawValue)
    results.push({ ...metric, value })
  }

  for (const metric of results) {
    if (
      (metric.valueType === "integer" || metric.valueType === "rating") &&
      !Number.isInteger(metric.value)
    ) {
      throw new Error(
        `Metric '${metric.id}' has valueType 'integer' but value ${metric.value} is not an integer`
      )
    }
  }

  const nonZeroResults = results.filter((metric) => metric.value !== 0)

  return indexBy(nonZeroResults, "id")
}

function calculateMetricValues(sources: readonly EffectSource[]): CalculationResult {
  const buffSources = calculateBuffs(sources)

  const existingBuffIds = new Set<string>()
  for (const source of sources) {
    if (source.categoryId === "buffs" || source.categoryId === "debuffs") {
      existingBuffIds.add(source.id)
    }
  }
  const newBuffs =
    existingBuffIds.size > 0 ? buffSources.filter((b) => !existingBuffIds.has(b.id)) : buffSources

  const sourcesWithBuffs: EffectSource[] = sources.concat(newBuffs)

  const baseStats = calculateBaseStats(sourcesWithBuffs)

  return {
    sources: sourcesWithBuffs,
    metrics: baseStats,
  }
}

export function calculateBuildStatsByBar(
  build: CharacterState,
  bar: "primary-weapon-bar" | "backup-weapon-bar",
  additionalSources?: readonly EffectSource[]
): CalculationResult {
  const buildSources = buildStateToEffectSources(build, bar)

  const baseArray: EffectSource[] = [base.data["base-stats"]]
  let allSources: EffectSource[] = baseArray.concat(buildSources)

  if (additionalSources) {
    allSources = allSources.concat(additionalSources)
  }

  const result = calculateMetricValues(allSources)

  return result
}
