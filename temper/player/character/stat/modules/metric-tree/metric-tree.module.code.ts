import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import type { MetricId } from "akasha/temper/player/character/formula-framework/modules/metric-id/metric-id.module.code.ts"
import type {
  CategoryNode,
  MetricTree,
  MetricTreeNode,
} from "akasha/temper/player/character/stat/modules/metric-tree-types/metric-tree-types.module.code.ts"

type Node = {
  readonly slug: string
  readonly nodeId: string
  readonly nodeType: string
  readonly title: string | null
  readonly parent: string | null
  readonly displayOrder: number
  readonly includeInChildAggregates: boolean
  readonly useAccentColor: boolean
}

type Under = ReadonlyMap<string | null, readonly Node[]>

type Held = { readonly children?: readonly MetricTreeNode[] }

const PARENT = "temper-metric-tree/"

const SUBCATEGORY = "subcategory"

const UNREAD =
  "the stat tree is read from pages, and nothing has read it yet — gate the screen on `MetricCatalogGate`, or hold it before the work starts"

class MetricTreeUnread extends Error {
  constructor() {
    super(UNREAD)
    this.name = "MetricTreeUnread"
  }
}

function nodeOf(value: Value): Node {
  return {
    slug: String(value.slug),
    nodeId: String(value.nodeId),
    nodeType: String(value.nodeType),
    title: typeof value.title === "string" ? value.title : null,
    parent: typeof value.parent === "string" ? value.parent : null,
    displayOrder: typeof value.displayOrder === "number" ? value.displayOrder : 0,
    includeInChildAggregates: value.includeInChildAggregates === true,
    useAccentColor: value.useAccentColor === true,
  }
}

function byParent(nodes: readonly Node[]): Under {
  const under = new Map<string | null, Node[]>()
  for (const node of nodes) {
    const held = under.get(node.parent) ?? []
    held.push(node)
    under.set(node.parent, held)
  }
  for (const held of under.values()) held.sort((one, two) => one.displayOrder - two.displayOrder)
  return under
}

function nameOf(node: Node): string {
  return node.title ?? node.nodeId
}

function heldUnder(under: Under, node: Node): Held {
  const held = under.get(`${PARENT}${node.slug}`)
  return held === undefined ? {} : { children: held.map((one) => treeNode(under, one)) }
}

function treeNode(under: Under, node: Node): MetricTreeNode {
  if (node.nodeType === SUBCATEGORY) {
    return { type: SUBCATEGORY, id: node.nodeId, name: nameOf(node), ...heldUnder(under, node) }
  }
  return {
    type: "metric",
    id: node.nodeId as MetricId,
    ...(node.includeInChildAggregates ? { includeInChildAggregates: true } : {}),
    ...(node.useAccentColor ? { useAccentColor: true } : {}),
    ...heldUnder(under, node),
  }
}

function categoryNode(under: Under, node: Node): CategoryNode {
  return { id: node.nodeId, name: nameOf(node), ...heldUnder(under, node) }
}

export function metricTreeOf(pages: Iterable<Value>): MetricTree {
  const under = byParent([...pages].map(nodeOf))
  return Object.fromEntries(
    (under.get(null) ?? []).map((node) => [node.nodeId, categoryNode(under, node)])
  )
}

let held: MetricTree | null = null

export function holdMetricTree(tree: MetricTree): MetricTree {
  held = tree
  return tree
}

export function metricTree(): MetricTree {
  if (held === null) throw new MetricTreeUnread()
  return held
}
