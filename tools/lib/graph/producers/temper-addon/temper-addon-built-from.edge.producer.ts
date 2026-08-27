import { z } from "zod"
import { defineEdgeProducer } from "../../define-edge-producer.ts"
import { nodeKey } from "../../key.ts"
import type { EdgeInit } from "../../types.ts"
import { CODE_REPO } from "../lib/constants.ts"
import { PACKAGE_NODE_TYPE } from "../package/types.ts"
import {
  TEMPER_ADDON_BUILT_FROM_EDGE_TYPE,
  TEMPER_ADDON_NODE_TYPE,
  type TemperAddonBuiltFromAttrs,
} from "./types.ts"

const AddonNameSchema = z.object({ name: z.string() }).passthrough()

export const temperAddonBuiltFromEdgeProducer = defineEdgeProducer({
  name: "temper-addon-built-from",
  edgeTypes: [TEMPER_ADDON_BUILT_FROM_EDGE_TYPE],
  dependsOn: ["temper-addon", "package"],
  build: (_ctx, graph) => {
    const edges: EdgeInit[] = []
    const attrs: TemperAddonBuiltFromAttrs = {}
    for (const node of graph.nodes(TEMPER_ADDON_NODE_TYPE)) {
      const addon = AddonNameSchema.parse(node.attrs)
      edges.push({
        type: TEMPER_ADDON_BUILT_FROM_EDGE_TYPE,
        from: node.id,
        to: nodeKey({ type: PACKAGE_NODE_TYPE, repo: CODE_REPO, key: addon.name }),
        attrs,
      })
    }
    return { edges }
  },
})

export default temperAddonBuiltFromEdgeProducer
