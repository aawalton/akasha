import ts from "typescript"
import { defineEdgeProducer } from "../../../define-edge-producer.ts"
import { readRepoFile } from "../../../repos.ts"
import type { EdgeInit, Graph, NodeId } from "../../../types.ts"
import { CODE_REPO } from "../../lib/constants.ts"
import { parseTsconfig } from "../ts-file/discover-tsconfig.ts"
import {
  TSCONFIG_FILE_NODE_TYPE,
  TSCONFIG_INCLUDES_FILE_EDGE_TYPE,
  type TsconfigIncludesFileAttrs,
} from "./types.ts"

const FILE_NODE_SUFFIX = "-file"

const fileNodeAt = (graph: Graph, path: string): NodeId | undefined =>
  graph.nodesByKey(path, CODE_REPO).find((one) => one.type.endsWith(FILE_NODE_SUFFIX))?.id

const declaresOwnPatterns = (relPath: string, body: string): boolean => {
  const read = ts.parseConfigFileTextToJson(relPath, body)
  const config = read.config as Record<string, unknown> | undefined
  if (config === undefined) return false
  return Array.isArray(config["include"]) || Array.isArray(config["files"])
}

export const tsconfigIncludesFileEdgeProducer = defineEdgeProducer({
  name: "tsconfig-includes-file",
  edgeTypes: [TSCONFIG_INCLUDES_FILE_EDGE_TYPE],
  dependsOn: ["file"],
  build: (ctx, graph) => {
    const repoRoot = ctx.repoRoots.get(CODE_REPO)
    if (repoRoot === undefined) return { edges: [] }
    const edges: EdgeInit[] = []
    for (const node of graph.nodes(TSCONFIG_FILE_NODE_TYPE)) {
      if (node.repo !== CODE_REPO) continue
      const relPath = String(node.key)
      const body = readRepoFile(ctx, CODE_REPO, relPath)
      if (body === null) continue
      if (!declaresOwnPatterns(relPath, body)) continue
      const seen = new Set<NodeId>()
      for (const absPath of parseTsconfig(ctx, CODE_REPO, repoRoot, relPath).fileNames) {
        if (!absPath.startsWith(`${repoRoot}/`)) continue
        const named = absPath.slice(repoRoot.length + 1)
        const to = fileNodeAt(graph, named)
        if (to === undefined || seen.has(to)) continue
        seen.add(to)
        const attrs: TsconfigIncludesFileAttrs = { path: named }
        edges.push({ type: TSCONFIG_INCLUDES_FILE_EDGE_TYPE, from: node.id, to, attrs })
      }
    }
    return { edges }
  },
})

export default tsconfigIncludesFileEdgeProducer
