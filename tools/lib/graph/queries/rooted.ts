import { readFileSync, readdirSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"
import type { Repo } from "../../../../page/document/types.ts"
import type { Graph, Node, NodeId } from "../types.ts"

const PAGES = join(dirname(fileURLToPath(import.meta.url)), "..", "..", "..", "..", "pages")

const CODE_REF_EDGE_TYPE = "import-code-ref"

const frontMatterScalar = (body: string, key: string): string | undefined => {
  const lines = body.split("\n")
  for (let at = 1; at < lines.length; at += 1) {
    const line = lines[at]
    if (line === undefined || line === "---") break
    if (line.startsWith(`${key}:`)) return line.slice(key.length + 1).trim()
  }
  return undefined
}

const codeTypesDeclaring = (dir: string, key: string): readonly string[] => {
  const held: string[] = []
  for (const name of readdirSync(join(PAGES, dir))) {
    if (!name.endsWith(".md")) continue
    const body = readFileSync(join(PAGES, dir, name), "utf-8")
    if (frontMatterScalar(body, key) !== "true") continue
    const codeType = frontMatterScalar(body, "code-type")
    if (codeType === undefined) {
      throw new Error(`graph: pages/${dir}/${name} states ${key} and names no code-type`)
    }
    held.push(codeType)
  }
  return held.sort()
}

export const deployedNodeTypes = (): readonly string[] => codeTypesDeclaring("graph-node", "deployed")

export const rootingEdgeTypes = (): readonly string[] => codeTypesDeclaring("graph-edge", "roots")

export const rootedIn = (graph: Graph): ReadonlySet<NodeId> => {
  const edgeTypes = rootingEdgeTypes()
  const rooted = new Set<NodeId>()
  const queue: NodeId[] = []
  for (const node of graph.nodes(deployedNodeTypes())) {
    if ((node.attrs as Record<string, unknown> | undefined)?.["disabled"] === true) continue
    if (rooted.has(node.id)) continue
    rooted.add(node.id)
    queue.push(node.id)
  }
  while (queue.length > 0) {
    const at = queue.shift()
    if (at === undefined) break
    for (const edge of graph.outEdges(at, edgeTypes)) {
      if (rooted.has(edge.to)) continue
      if (graph.node(edge.to) === undefined) continue
      rooted.add(edge.to)
      queue.push(edge.to)
    }
  }
  return rooted
}

export type NamedAsString = {
  readonly node: Node
  readonly namedBy: readonly string[]
}

export const unrootedNamedAsString = (graph: Graph, repo: Repo): readonly NamedAsString[] => {
  const rooted = rootedIn(graph)
  const namers = new Map<NodeId, string[]>()
  for (const one of graph.nodes()) {
    for (const edge of graph.outEdges(one.id, [CODE_REF_EDGE_TYPE])) {
      const to = graph.node(edge.to)
      if (to === undefined || to.repo !== repo || rooted.has(to.id)) continue
      const held = namers.get(to.id) ?? []
      held.push(String(one.key))
      namers.set(to.id, held)
    }
  }
  const answered: NamedAsString[] = []
  for (const one of graph.nodes()) {
    const held = namers.get(one.id)
    if (held === undefined) continue
    answered.push({ node: one, namedBy: [...new Set(held)].sort() })
  }
  return answered.sort((a, b) => (a.node.id < b.node.id ? -1 : a.node.id > b.node.id ? 1 : 0))
}
