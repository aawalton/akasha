import { posix } from "node:path"
import { defineEdgeProducer } from "../../define-edge-producer.ts"
import { nodeKey } from "../../key.ts"
import type { EdgeInit } from "../../types.ts"
import { CSS_FILE_NODE_TYPE } from "../file/css-file/types.ts"
import { TS_FILE_NODE_TYPES } from "../file/ts-file/types.ts"
import { TsFileAttrsSchema } from "../file/ts-file/types-schemas"
import { CODE_REPO } from "../../../../../repo/scope/scope.ts"
import { IMPORT_STYLESHEET_EDGE_TYPE, type ImportStylesheetAttrs } from "./types.ts"

const STYLESHEET_SUFFIX = ".css"

const isRelative = (specifier: string): boolean =>
  specifier.startsWith("./") || specifier.startsWith("../")

export const resolvedBeside = (importer: string, specifier: string): string | null => {
  const joined = posix.normalize(posix.join(posix.dirname(importer), specifier))
  return joined === ".." || joined.startsWith("../") ? null : joined
}

export const stylesheetEdgeProducer = defineEdgeProducer({
  name: "stylesheet-edge",
  edgeTypes: [IMPORT_STYLESHEET_EDGE_TYPE],
  dependsOn: ["file"],
  build: (_ctx, upstream) => {
    const edges: EdgeInit[] = []
    const seen = new Set<string>()
    for (const node of upstream.nodes(TS_FILE_NODE_TYPES)) {
      if (node.repo !== CODE_REPO) continue
      const attrs = TsFileAttrsSchema.parse(node.attrs)
      for (const held of attrs.imports) {
        if (!held.specifier.endsWith(STYLESHEET_SUFFIX)) continue
        if (!isRelative(held.specifier)) continue
        const resolved = resolvedBeside(attrs.path, held.specifier)
        if (resolved === null) continue
        const to = nodeKey({ type: CSS_FILE_NODE_TYPE, repo: CODE_REPO, key: resolved })
        if (upstream.node(to) === undefined) continue
        const at = `${node.id} ${to}`
        if (seen.has(at)) continue
        seen.add(at)
        const edgeAttrs: ImportStylesheetAttrs = { specifier: held.specifier, resolved }
        edges.push({ type: IMPORT_STYLESHEET_EDGE_TYPE, from: node.id, to, attrs: edgeAttrs })
      }
    }
    return { edges }
  },
})

export default stylesheetEdgeProducer
