import { z } from "zod"
import { defineEdgeProducer } from "../../define-edge-producer.ts"
import { nodeKey } from "../../key.ts"
import type { EdgeInit } from "../../types.ts"
import { FILE_NODE_TYPES } from "../file/node-types.ts"
import { CODE_REPO } from "../../../../../repo/scope/scope.ts"
import {
  PACKAGE_NODE_TYPE,
  PackageAttrsSchema,
  PKG_CONTAINS_FILE_EDGE_TYPE,
  type PkgContainsFileAttrs,
} from "./types.ts"

const FilePathAttrsSchema = z.object({ path: z.string() }).passthrough()

const isFileInWorkspace = (pkgPath: string, filePath: string): boolean =>
  filePath === pkgPath || filePath.startsWith(`${pkgPath}/`)

export const packageContainsFileEdgeProducer = defineEdgeProducer({
  name: "package-contains-file",
  edgeTypes: [PKG_CONTAINS_FILE_EDGE_TYPE],
  dependsOn: ["package", "file"],
  build: (_ctx, graph) => {
    const workspaces: Array<{ readonly path: string; readonly name: string }> = []
    for (const node of graph.nodes(PACKAGE_NODE_TYPE)) {
      const attrs = PackageAttrsSchema.parse(node.attrs)
      if (attrs.path === "") continue
      workspaces.push({ path: attrs.path, name: attrs.name })
    }
    workspaces.sort((a, b) => b.path.length - a.path.length)

    const edges: EdgeInit[] = []
    const emptyAttrs: PkgContainsFileAttrs = {}
    for (const fileType of FILE_NODE_TYPES) {
      for (const node of graph.nodes(fileType)) {
        const parsed = FilePathAttrsSchema.safeParse(node.attrs)
        if (!parsed.success) continue
        const filePath = parsed.data.path
        let ownerName: string | undefined
        for (const ws of workspaces) {
          if (isFileInWorkspace(ws.path, filePath)) {
            ownerName = ws.name
            break
          }
        }
        if (ownerName === undefined) continue
        edges.push({
          type: PKG_CONTAINS_FILE_EDGE_TYPE,
          from: nodeKey({ type: PACKAGE_NODE_TYPE, repo: CODE_REPO, key: ownerName }),
          to: node.id,
          attrs: emptyAttrs,
        })
      }
    }

    return { edges }
  },
})

export default packageContainsFileEdgeProducer
