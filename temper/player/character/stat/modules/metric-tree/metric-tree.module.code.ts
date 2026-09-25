import type { MetricId } from "akasha/temper/player/character/formula-framework/modules/metric-id/metric-id.module.code.ts"
import type {
  CategoryNode,
  MetricTree,
  MetricTreeNode,
} from "akasha/temper/player/character/stat/modules/metric-tree-types/metric-tree-types.module.code.ts"
import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"
import "akasha/code/router-app/vite-client/vite-client.type-declaration.d.ts"

type Paged = Readonly<Record<string, TemperMetricTree>>

type Held = { readonly children?: readonly MetricTreeNode[] }

const PARENT = "temper-metric-tree/"

const SUBCATEGORY = "subcategory"

const FOUND = import.meta.glob<Paged>(
  "../../../../progress/temper-metric-tree/**/*.temper-metric-tree.ts",
  { eager: true }
)

function byParent(
  nodes: readonly TemperMetricTree[]
): ReadonlyMap<string | undefined, readonly TemperMetricTree[]> {
  const under = new Map<string | undefined, TemperMetricTree[]>()
  for (const node of nodes) {
    const held = under.get(node.parent) ?? []
    held.push(node)
    under.set(node.parent, held)
  }
  for (const held of under.values()) held.sort((one, two) => one.displayOrder - two.displayOrder)
  return under
}

const UNDER = byParent(Object.values(FOUND).flatMap((paged) => Object.values(paged)))

function nameOf(node: TemperMetricTree): string {
  return node.title ?? node.nodeId
}

function heldUnder(node: TemperMetricTree): Held {
  const held = UNDER.get(`${PARENT}${node.slug}`)
  return held === undefined ? {} : { children: held.map(treeNode) }
}

function treeNode(node: TemperMetricTree): MetricTreeNode {
  if (node.nodeType === SUBCATEGORY) {
    return { type: SUBCATEGORY, id: node.nodeId, name: nameOf(node), ...heldUnder(node) }
  }
  return {
    type: "metric",
    id: node.nodeId as MetricId,
    ...(node.includeInChildAggregates === true ? { includeInChildAggregates: true } : {}),
    ...(node.useAccentColor === true ? { useAccentColor: true } : {}),
    ...heldUnder(node),
  }
}

function categoryNode(node: TemperMetricTree): CategoryNode {
  return { id: node.nodeId, name: nameOf(node), ...heldUnder(node) }
}

export const METRIC_TREE: MetricTree = Object.fromEntries(
  (UNDER.get(undefined) ?? []).map((node) => [node.nodeId, categoryNode(node)])
)
