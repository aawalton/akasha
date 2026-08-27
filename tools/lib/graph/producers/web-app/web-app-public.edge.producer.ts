import { defineEdgeProducer } from "../../define-edge-producer.ts"
import type { EdgeInit, Graph, NodeId } from "../../types.ts"
import { FILE_NODE_TYPES } from "../file/node-types.ts"
import { CODE_REPO } from "../lib/constants.ts"
import { PACKAGE_NODE_TYPE, PackageAttrsSchema } from "../package/types.ts"
import { soleOwnerBySlug } from "./web-app-built-from.edge.producer.ts"
import { WEB_APP_NODE_TYPE, WEB_APP_PUBLIC_EDGE_TYPE, type WebAppPublicAttrs } from "./types.ts"

const PUBLIC_DIR = "public"

const pathById = (graph: Graph): ReadonlyMap<NodeId, string> => {
  const held = new Map<NodeId, string>()
  for (const node of graph.nodes(PACKAGE_NODE_TYPE)) {
    const attrs = PackageAttrsSchema.parse(node.attrs)
    if (attrs.path === "") continue
    held.set(node.id, attrs.path)
  }
  return held
}

export const webAppPublicEdgeProducer = defineEdgeProducer({
  name: "web-app-public",
  edgeTypes: [WEB_APP_PUBLIC_EDGE_TYPE],
  dependsOn: ["web-app", "package", "file"],
  build: (_ctx, graph) => {
    const bySlug = soleOwnerBySlug(graph)
    const byId = pathById(graph)
    const served: { readonly under: string; readonly from: NodeId }[] = []
    for (const node of graph.nodes(WEB_APP_NODE_TYPE)) {
      const owner = bySlug.get(node.key)
      if (owner === undefined) continue
      const path = byId.get(owner)
      if (path === undefined) continue
      served.push({ under: `${path}/${PUBLIC_DIR}/`, from: node.id })
    }
    if (served.length === 0) return { edges: [] }

    const edges: EdgeInit[] = []
    const attrs: WebAppPublicAttrs = {}
    for (const node of graph.nodes(FILE_NODE_TYPES)) {
      if (node.repo !== CODE_REPO) continue
      const path = String(node.key)
      for (const one of served) {
        if (!path.startsWith(one.under)) continue
        edges.push({ type: WEB_APP_PUBLIC_EDGE_TYPE, from: one.from, to: node.id, attrs })
      }
    }
    return { edges }
  },
})

export default webAppPublicEdgeProducer
