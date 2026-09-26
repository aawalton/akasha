import type { MetricId } from "akasha/temper/player/character/formula-framework/modules/metric-id/metric-id.module.code.ts"
import { metricTree } from "akasha/temper/player/character/stat/modules/metric-tree/metric-tree.module.code.ts"
import {
  isMetricNode,
  type MetricTree,
  type MetricTreeNode,
} from "akasha/temper/player/character/stat/modules/metric-tree-types/metric-tree-types.module.code.ts"

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

const CHAINS = new WeakMap<MetricTree, Map<MetricId, MetricId[]>>()

function chainsOf(tree: MetricTree): Map<MetricId, MetricId[]> {
  const already = CHAINS.get(tree)
  if (already !== undefined) return already
  const built = buildParentChainIndex(tree)
  CHAINS.set(tree, built)
  return built
}

export function getAggregateMetricIds(metricId: MetricId): readonly MetricId[] {
  return chainsOf(metricTree()).get(metricId) ?? [metricId]
}
