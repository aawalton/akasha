import { z } from "zod"
import { defineEdgeProducer } from "../../define-edge-producer.ts"
import type { EdgeInit, NodeId } from "../../types.ts"
import { CODE_REPO } from "../lib/constants.ts"
import { PACKAGE_NODE_TYPE, WORKSPACE_ROOT_NODE_TYPE } from "../package/types.ts"
import { RUST_PACKAGE_NODE_TYPE } from "../rust-package/types.ts"
import {
  PKG_CARRIES_TOOLING_EDGE_TYPE,
  type PkgCarriesToolingAttrs,
  TOOLING_FILE_NODE_TYPES,
} from "./types.ts"

type Owner = {
  readonly path: string
  readonly id: NodeId
}

const OWNER_NODE_TYPES: readonly string[] = [
  PACKAGE_NODE_TYPE,
  RUST_PACKAGE_NODE_TYPE,
  WORKSPACE_ROOT_NODE_TYPE,
]

const OwnerAttrsSchema = z.object({ path: z.string() }).passthrough()

const holds = (ownerPath: string, filePath: string): boolean =>
  ownerPath === "" || filePath === ownerPath || filePath.startsWith(`${ownerPath}/`)

export const pkgCarriesToolingEdgeProducer = defineEdgeProducer({
  name: "pkg-carries-tooling",
  edgeTypes: [PKG_CARRIES_TOOLING_EDGE_TYPE],
  dependsOn: ["package", "rust-package", "workspace-root", "file"],
  build: (_ctx, upstream) => {
    const owners: Owner[] = []
    for (const node of upstream.nodes(OWNER_NODE_TYPES)) {
      if (node.repo !== CODE_REPO) continue
      const attrs = OwnerAttrsSchema.parse(node.attrs)
      if (node.type === PACKAGE_NODE_TYPE && attrs.path === "") continue
      owners.push({ path: attrs.path, id: node.id })
    }
    owners.sort((a, b) => b.path.length - a.path.length)

    const owning = (filePath: string): Owner | undefined =>
      owners.find((one) => holds(one.path, filePath))

    const edges: EdgeInit[] = []
    const attrs: PkgCarriesToolingAttrs = {}
    const seen = new Set<string>()

    for (const node of upstream.nodes(TOOLING_FILE_NODE_TYPES)) {
      if (node.repo !== CODE_REPO) continue
      const owner = owning(String(node.key))
      if (owner === undefined) continue
      const at = `${owner.id} ${node.id}`
      if (seen.has(at)) continue
      seen.add(at)
      edges.push({ type: PKG_CARRIES_TOOLING_EDGE_TYPE, from: owner.id, to: node.id, attrs })
    }

    return { edges }
  },
})

export default pkgCarriesToolingEdgeProducer
