import type { MetricId } from "@temper/shared-formula-framework/metric-ids.generated"
import { METRIC_TREE } from "../generated/metric-tree.generated"
import { isMetricNode, type MetricTree, type MetricTreeNode } from "./metric-tree-types"

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
