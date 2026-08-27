import { defineEdgeProducer } from "../../define-edge-producer.ts"
import type { EdgeInit, Graph, NodeId } from "../../types.ts"
import { CODE_REPO } from "../lib/constants.ts"
import { PACKAGE_NODE_TYPE } from "../package/types.ts"
import { discoverWebAppEntries } from "./entry.ts"
import { WEB_APP_ENTRY_EDGE_TYPE, type WebAppEntryAttrs } from "./types.ts"

const FILE_NODE_SUFFIX = "-file"

type Owner = { readonly path: string; readonly id: NodeId }

const ownersByPath = (graph: Graph): readonly Owner[] => {
  const held: Owner[] = []
  for (const node of graph.nodes(PACKAGE_NODE_TYPE)) {
    if (node.repo !== CODE_REPO) continue
    const path = (node.attrs as Record<string, unknown> | undefined)?.["path"]
    if (typeof path !== "string" || path === "") continue
    held.push({ path, id: node.id })
  }
  return [...held].sort((a, b) => b.path.length - a.path.length)
}

const owningPackage = (owners: readonly Owner[], path: string): NodeId | undefined =>
  owners.find((one) => path.startsWith(`${one.path}/`))?.id

const fileNodeAt = (graph: Graph, path: string): NodeId | undefined =>
  graph.nodesByKey(path, CODE_REPO).find((one) => one.type.endsWith(FILE_NODE_SUFFIX))?.id

export const webAppEntryEdgeProducer = defineEdgeProducer({
  name: "web-app-entry",
  edgeTypes: [WEB_APP_ENTRY_EDGE_TYPE],
  dependsOn: ["package", "file"],
  build: (ctx, graph) => {
    const owners = ownersByPath(graph)
    const edges: EdgeInit[] = []
    const seen = new Set<string>()
    for (const entry of discoverWebAppEntries(ctx)) {
      const from = owningPackage(owners, entry.path)
      if (from === undefined) continue
      const to = fileNodeAt(graph, entry.path)
      if (to === undefined) continue
      const already = `${from}\u0000${to}`
      if (seen.has(already)) continue
      seen.add(already)
      const attrs: WebAppEntryAttrs = { kind: entry.kind, specifier: entry.specifier }
      edges.push({ type: WEB_APP_ENTRY_EDGE_TYPE, from, to, attrs })
    }
    return { edges }
  },
})

export default webAppEntryEdgeProducer
