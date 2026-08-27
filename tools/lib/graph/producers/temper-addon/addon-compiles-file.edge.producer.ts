import { defineEdgeProducer } from "../../define-edge-producer.ts"
import type { EdgeInit } from "../../types.ts"
import { TSCONFIG_INCLUDES_FILE_EDGE_TYPE } from "../file/tsconfig-file/types.ts"
import {
  ADDON_COMPILES_FILE_EDGE_TYPE,
  ADDON_TSCONFIG_EDGE_TYPE,
  type AddonCompilesFileAttrs,
  TEMPER_ADDON_NODE_TYPE,
} from "./types.ts"

export const addonCompilesFileEdgeProducer = defineEdgeProducer({
  name: "addon-compiles-file",
  edgeTypes: [ADDON_COMPILES_FILE_EDGE_TYPE],
  dependsOn: ["addon-tsconfig", "tsconfig-includes-file"],
  build: (_ctx, graph) => {
    const edges: EdgeInit[] = []
    const attrs: AddonCompilesFileAttrs = {}
    const seen = new Set<string>()
    for (const addon of graph.nodes(TEMPER_ADDON_NODE_TYPE)) {
      for (const tsconfig of graph.outEdges(addon.id, [ADDON_TSCONFIG_EDGE_TYPE])) {
        for (const included of graph.outEdges(tsconfig.to, [TSCONFIG_INCLUDES_FILE_EDGE_TYPE])) {
          if (graph.node(included.to) === undefined) continue
          const at = `${addon.id} ${included.to}`
          if (seen.has(at)) continue
          seen.add(at)
          edges.push({
            type: ADDON_COMPILES_FILE_EDGE_TYPE,
            from: addon.id,
            to: included.to,
            attrs,
          })
        }
      }
    }
    return { edges }
  },
})

export default addonCompilesFileEdgeProducer
