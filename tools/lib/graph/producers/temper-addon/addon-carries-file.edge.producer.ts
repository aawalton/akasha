import { defineEdgeProducer } from "../../define-edge-producer.ts"
import type { EdgeInit, Graph, NodeId } from "../../types.ts"
import { CODE_REPO } from "../../../../../repo/scope/scope.ts"
import { discoverAddonCarries } from "./carries.ts"
import {
  ADDON_CARRIES_FILE_EDGE_TYPE,
  TEMPER_ADDON_NODE_TYPE,
  type AddonCarriesFileAttrs,
} from "./types.ts"

const FILE_NODE_SUFFIX = "-file"

const fileNodeAt = (graph: Graph, path: string): NodeId | undefined =>
  graph.nodesByKey(path, CODE_REPO).find((one) => one.type.endsWith(FILE_NODE_SUFFIX))?.id

export const addonCarriesFileEdgeProducer = defineEdgeProducer({
  name: "addon-carries-file",
  edgeTypes: [ADDON_CARRIES_FILE_EDGE_TYPE],
  dependsOn: ["temper-addon", "file"],
  build: (ctx, graph) => {
    const addons: { name: string; path: string; id: NodeId }[] = []
    for (const node of graph.nodes(TEMPER_ADDON_NODE_TYPE)) {
      const attrs = node.attrs as Record<string, unknown> | undefined
      const name = attrs?.["name"]
      const path = attrs?.["path"]
      if (typeof name !== "string" || typeof path !== "string" || path === "") continue
      addons.push({ name, path, id: node.id })
    }
    const byName = new Map(addons.map((one) => [one.name, one.id]))
    const edges: EdgeInit[] = []
    const seen = new Set<string>()
    for (const carry of discoverAddonCarries(ctx, addons)) {
      const from = byName.get(carry.addon)
      if (from === undefined) continue
      const to = fileNodeAt(graph, carry.path)
      if (to === undefined) continue
      const already = `${from} ${to}`
      if (seen.has(already)) continue
      seen.add(already)
      const attrs: AddonCarriesFileAttrs = { kind: carry.kind, path: carry.carrier }
      edges.push({ type: ADDON_CARRIES_FILE_EDGE_TYPE, from, to, attrs })
    }
    return { edges }
  },
})

export default addonCarriesFileEdgeProducer
