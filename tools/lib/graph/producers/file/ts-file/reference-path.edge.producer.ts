import { posix } from "node:path"
import ts from "typescript"
import { defineEdgeProducer } from "../../../define-edge-producer.ts"
import { readRepoFile } from "../../../repos.ts"
import type { EdgeInit, Graph, NodeId } from "../../../types.ts"
import { CODE_REPO } from "../../../../../../repo/scope/scope.ts"
import {
  IMPORT_REFERENCE_PATH_EDGE_TYPE,
  TS_FILE_NODE_TYPES,
  type ImportReferencePathAttrs,
} from "./types.ts"

const FILE_NODE_SUFFIX = "-file"

const fileNodeAt = (graph: Graph, path: string): NodeId | undefined =>
  graph.nodesByKey(path, CODE_REPO).find((one) => one.type.endsWith(FILE_NODE_SUFFIX))?.id

export const referencePathEdgeProducer = defineEdgeProducer({
  name: "reference-path",
  edgeTypes: [IMPORT_REFERENCE_PATH_EDGE_TYPE],
  dependsOn: ["file"],
  build: (ctx, graph) => {
    const edges: EdgeInit[] = []
    for (const node of graph.nodes([...TS_FILE_NODE_TYPES])) {
      if (node.repo !== CODE_REPO) continue
      const relPath = String(node.key)
      const body = readRepoFile(ctx, CODE_REPO, relPath)
      if (body === null) continue
      const seen = new Set<NodeId>()
      for (const ref of ts.preProcessFile(body, true, true).referencedFiles) {
        const named = posix.normalize(posix.join(posix.dirname(relPath), ref.fileName))
        const to = fileNodeAt(graph, named)
        if (to === undefined || seen.has(to)) continue
        seen.add(to)
        const attrs: ImportReferencePathAttrs = { specifier: ref.fileName, resolved: named }
        edges.push({ type: IMPORT_REFERENCE_PATH_EDGE_TYPE, from: node.id, to, attrs })
      }
    }
    return { edges }
  },
})

export default referencePathEdgeProducer
