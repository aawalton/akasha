import type { MetricId } from "@akasha/temper-formula-framework/metric-id"
import { METRIC_TREE } from "../metric-tree-data/metric-tree-data.module.code.ts"
import {
  isMetricNode,
  type MetricTree,
  type MetricTreeNode,
} from "../metric-tree-types/metric-tree-types.module.code.ts"

function buildParentChainIndex(tree: MetricTree): Map<MetricId, MetricId[]> {
  const index = new Map<MetricId, MetricId[]>()

  function traverse(
    nodes: readonly MetricTreeNode[],
    parentChain: ReadonlyArray<{ id: MetricId; includeInChildAggregates: boolean }>
  ): undefined {
    for (const node of nodes) {
      if (isMetricNode(node)) {
        const aggregateAncestors = parentChain
          .filter((n) => n.includeInChildAggregates)
          .map((n) => n.id)

        index.set(node.id, [...aggregateAncestors, node.id])

        if (node.children) {
          traverse(node.children, [
            ...parentChain,
            { id: node.id, includeInChildAggregates: node.includeInChildAggregates ?? false },
          ])
        }
      } else {
        if (node.children) {
          traverse(node.children, parentChain)
        }
      }
    }
  }

  for (const category of Object.values(tree)) {
    if (category.children) {
      traverse(category.children, [])
    }
  }

  return index
}

const METRIC_PARENT_CHAIN = buildParentChainIndex(METRIC_TREE)

export function getAggregateMetricIds(metricId: MetricId): readonly MetricId[] {
  return METRIC_PARENT_CHAIN.get(metricId) ?? [metricId]
}
