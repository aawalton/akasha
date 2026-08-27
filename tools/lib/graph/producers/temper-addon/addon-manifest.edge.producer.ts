import { posix } from "node:path"
import { defineEdgeProducer } from "../../define-edge-producer.ts"
import type { EdgeInit } from "../../types.ts"
import { JSON_FILE_NODE_TYPE } from "../file/json-file/types.ts"
import { CODE_REPO } from "../lib/constants.ts"
import {
  ADDON_MANIFEST_EDGE_TYPE,
  type AddonManifestAttrs,
  TEMPER_ADDON_NODE_TYPE,
} from "./types.ts"

const MANIFEST_NAME = "addon.json"

export const addonManifestEdgeProducer = defineEdgeProducer({
  name: "addon-manifest",
  edgeTypes: [ADDON_MANIFEST_EDGE_TYPE],
  dependsOn: ["temper-addon", "file"],
  build: (_ctx, graph) => {
    const edges: EdgeInit[] = []
    for (const node of graph.nodes(TEMPER_ADDON_NODE_TYPE)) {
      const path = (node.attrs as Record<string, unknown> | undefined)?.["path"]
      if (typeof path !== "string" || path === "") continue
      const relPath = posix.join(path, MANIFEST_NAME)
      const to = graph
        .nodesByKey(relPath, CODE_REPO)
        .find((one) => one.type === JSON_FILE_NODE_TYPE)?.id
      if (to === undefined) continue
      const attrs: AddonManifestAttrs = { path: relPath }
      edges.push({ type: ADDON_MANIFEST_EDGE_TYPE, from: node.id, to, attrs })
    }
    return { edges }
  },
})

export default addonManifestEdgeProducer
