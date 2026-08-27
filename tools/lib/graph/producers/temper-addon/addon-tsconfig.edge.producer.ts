import { posix } from "node:path"
import { defineEdgeProducer } from "../../define-edge-producer.ts"
import type { EdgeInit } from "../../types.ts"
import { CODE_REPO } from "../lib/constants.ts"
import { TSCONFIG_FILE_NODE_TYPE } from "../file/tsconfig-file/types.ts"
import {
  ADDON_TSCONFIG_EDGE_TYPE,
  TEMPER_ADDON_NODE_TYPE,
  type AddonTsconfigAttrs,
} from "./types.ts"

const TSCONFIG_NAME = "tsconfig.json"

export const addonTsconfigEdgeProducer = defineEdgeProducer({
  name: "addon-tsconfig",
  edgeTypes: [ADDON_TSCONFIG_EDGE_TYPE],
  dependsOn: ["temper-addon", "file"],
  build: (_ctx, graph) => {
    const edges: EdgeInit[] = []
    for (const node of graph.nodes(TEMPER_ADDON_NODE_TYPE)) {
      const path = (node.attrs as Record<string, unknown> | undefined)?.["path"]
      if (typeof path !== "string" || path === "") continue
      const relPath = posix.join(path, TSCONFIG_NAME)
      const to = graph
        .nodesByKey(relPath, CODE_REPO)
        .find((one) => one.type === TSCONFIG_FILE_NODE_TYPE)?.id
      if (to === undefined) continue
      const attrs: AddonTsconfigAttrs = { path: relPath }
      edges.push({ type: ADDON_TSCONFIG_EDGE_TYPE, from: node.id, to, attrs })
    }
    return { edges }
  },
})

export default addonTsconfigEdgeProducer
