import type { MetricId } from "akasha/temper/player/character/formula-framework/modules/metric-id/metric-id.module.code.ts"
import type { FormulaNode } from "akasha/temper/player/character/stat/modules/formula-types/formula-types.module.code.ts"
import {
  type MetricWithFormula,
  metrics,
} from "akasha/temper/player/character/stat/modules/metrics/metrics.module.code.ts"

function extractMetricReferences(node: FormulaNode): Set<MetricId> {
  const refs = new Set<MetricId>()

  if (node.type === "metric-refs") {
    for (const metricIdStr of node.metricIds) {
      if (metrics().has(metricIdStr)) {
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

export function buildDependencyGraph(
  metrics: readonly MetricWithFormula[]
): Map<MetricId, Set<MetricId>> {
  const graph = new Map<MetricId, Set<MetricId>>()

  for (const metric of metrics) {
    const deps = extractMetricReferences(metric.formula)
    graph.set(metric.id, deps)
  }

  return graph
}
