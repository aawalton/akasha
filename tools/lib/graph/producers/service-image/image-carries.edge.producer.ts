import { defineEdgeProducer } from "../../define-edge-producer.ts"
import { nodeKey } from "../../key.ts"
import type { EdgeInit } from "../../types.ts"
import { JSON_FILE_NODE_TYPE } from "../file/json-file/types.ts"
import { LOCK_FILE_NODE_TYPE } from "../file/lock-file/types.ts"
import { CODE_REPO } from "../lib/constants.ts"
import { workspaceDirsAt } from "../lib/workspace-dirs.ts"
import { PACKAGE_NODE_TYPE, PackageAttrsSchema } from "../package/types.ts"
import { discoverServiceImages } from "./discover.ts"
import { IMAGE_CARRIES_EDGE_TYPE, type ImageCarriesAttrs } from "./types.ts"

const ROOT_MANIFEST = "package.json"

const LOCKFILE = "bun.lock"

const TSCONFIG_BASE = "tsconfig.base.json"

export const imageCarriesEdgeProducer = defineEdgeProducer({
  name: "image-carries",
  edgeTypes: [IMAGE_CARRIES_EDGE_TYPE],
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

    const workspaceDirs = workspaceDirsAt(ctx, CODE_REPO)
    const edges: EdgeInit[] = []
    const attrs: ImageCarriesAttrs = {}
    const seen = new Set<string>()

    const carry = (from: string, to: string): undefined => {
      if (upstream.node(to) === undefined) return
      const at = `${from} ${to}`
      if (seen.has(at)) return
      seen.add(at)
      edges.push({ type: IMAGE_CARRIES_EDGE_TYPE, from, to, attrs })
    }

    const jsonFile = (key: string): string =>
      nodeKey({ type: JSON_FILE_NODE_TYPE, repo: CODE_REPO, key })

    for (const image of images) {
      const name = packageNameByPath.get(image.dir)
      if (name === undefined) continue
      const from = nodeKey({ type: PACKAGE_NODE_TYPE, repo: CODE_REPO, key: name })
      if (upstream.node(from) === undefined) continue

      carry(from, nodeKey({ type: LOCK_FILE_NODE_TYPE, repo: CODE_REPO, key: LOCKFILE }))
      carry(from, jsonFile(ROOT_MANIFEST))
      if (image.carriesTsconfigBase) carry(from, jsonFile(TSCONFIG_BASE))
      for (const dir of workspaceDirs) carry(from, jsonFile(`${dir}/${ROOT_MANIFEST}`))
    }

    return { edges }
  },
})

export default imageCarriesEdgeProducer
