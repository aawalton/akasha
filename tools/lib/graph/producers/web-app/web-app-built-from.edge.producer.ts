import { packageSlugOf } from "../../../package-manifest.ts"
import { defineEdgeProducer } from "../../define-edge-producer.ts"
import type { EdgeInit, Graph } from "../../types.ts"
import { PACKAGE_NODE_TYPE } from "../package/types.ts"
import {
  WEB_APP_BUILT_FROM_EDGE_TYPE,
  WEB_APP_NODE_TYPE,
  type WebAppBuiltFromAttrs,
} from "./types.ts"

export const soleOwnerBySlug = (graph: Graph): ReadonlyMap<string, string> => {
  const owners = new Map<string, string[]>()
  for (const node of graph.nodes(PACKAGE_NODE_TYPE)) {
    const slug = packageSlugOf(node.key)
    const held = owners.get(slug)
    if (held === undefined) owners.set(slug, [node.id])
    else held.push(node.id)
  }
  const sole = new Map<string, string>()
  for (const [slug, ids] of owners) {
    const only = ids.length === 1 ? ids[0] : undefined
    if (only !== undefined) sole.set(slug, only)
  }
  return sole
}

export const webAppBuiltFromEdgeProducer = defineEdgeProducer({
  name: "web-app-built-from",
  edgeTypes: [WEB_APP_BUILT_FROM_EDGE_TYPE],
  dependsOn: ["web-app", "package"],
  build: (_ctx, graph) => {
    const bySlug = soleOwnerBySlug(graph)
    const edges: EdgeInit[] = []
    const attrs: WebAppBuiltFromAttrs = {}
    for (const node of graph.nodes(WEB_APP_NODE_TYPE)) {
      const to = bySlug.get(node.key)
      if (to === undefined) continue
      edges.push({ type: WEB_APP_BUILT_FROM_EDGE_TYPE, from: node.id, to, attrs })
    }
    return { edges }
  },
})

export default webAppBuiltFromEdgeProducer
