import { defineEdgeProducer } from "../../define-edge-producer.ts"
import { nodeKey } from "../../key.ts"
import type { EdgeInit } from "../../types.ts"
import { TS_FILE_NODE_TYPE } from "../file/ts-file/types.ts"
import { CODE_REPO } from "../lib/constants.ts"
import { PACKAGE_NODE_TYPE, PackageAttrsSchema } from "../package/types.ts"
import { discoverServiceImages } from "./discover.ts"
import { IMAGE_RUNS_ENTRY_EDGE_TYPE, type ImageRunsEntryAttrs } from "./types.ts"

export const imageRunsEntryEdgeProducer = defineEdgeProducer({
  name: "image-runs-entry",
  edgeTypes: [IMAGE_RUNS_ENTRY_EDGE_TYPE],
  dependsOn: ["package", "file"],
  build: (ctx, upstream) => {
    const images = discoverServiceImages(ctx)
    if (images.length === 0) return { edges: [] }

    const packageNameByPath = new Map<string, string>()
    for (const node of upstream.nodes(PACKAGE_NODE_TYPE)) {
      const attrs = PackageAttrsSchema.parse(node.attrs)
      if (attrs.path === "") continue
      packageNameByPath.set(attrs.path, attrs.name)
    }

    const edges: EdgeInit[] = []
    const attrs: ImageRunsEntryAttrs = {}
    const seen = new Set<string>()

    for (const image of images) {
      const name = packageNameByPath.get(image.dir)
      if (name === undefined) continue
      const from = nodeKey({ type: PACKAGE_NODE_TYPE, repo: CODE_REPO, key: name })
      if (upstream.node(from) === undefined) continue
      const to = nodeKey({ type: TS_FILE_NODE_TYPE, repo: CODE_REPO, key: image.entryPath })
      if (upstream.node(to) === undefined) continue
      const at = `${from} ${to}`
      if (seen.has(at)) continue
      seen.add(at)
      edges.push({ type: IMAGE_RUNS_ENTRY_EDGE_TYPE, from, to, attrs })
    }

    return { edges }
  },
})

export default imageRunsEntryEdgeProducer
