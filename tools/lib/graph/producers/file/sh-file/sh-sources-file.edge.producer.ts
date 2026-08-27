import { defineEdgeProducer } from "../../../define-edge-producer.ts"
import { readRepoFile } from "../../../repos.ts"
import type { EdgeInit, Node } from "../../../types.ts"
import { repoFiles } from "../../lib/repo-files.ts"
import { sourcedPath, sourcedSpecifiers } from "./sources.ts"
import {
  SH_FILE_NODE_TYPE,
  SH_SOURCES_FILE_EDGE_TYPE,
  type ShSourcesFileAttrs,
} from "./types.ts"

export const shSourcesFileEdgeProducer = defineEdgeProducer({
  name: "sh-sources-file",
  edgeTypes: [SH_SOURCES_FILE_EDGE_TYPE],
  dependsOn: ["file"],
  build: (ctx, graph) => {
    const edges: EdgeInit[] = []
    const standingByRepo = new Map<string, ReadonlySet<string>>()

    for (const node of graph.nodes(SH_FILE_NODE_TYPE)) {
      const repo = node.repo
      if (repo === undefined) continue
      const fromPath = String(node.key)
      const text = readRepoFile(ctx, repo, fromPath)
      if (text === null) continue
      const specifiers = sourcedSpecifiers(text)
      if (specifiers.length === 0) continue

      let standing = standingByRepo.get(repo)
      if (standing === undefined) {
        standing = new Set(repoFiles(ctx, repo))
        standingByRepo.set(repo, standing)
      }

      for (const specifier of specifiers) {
        const at = sourcedPath(fromPath, specifier, standing)
        if (at === null) continue
        const target = graph
          .nodesByKey(at, repo)
          .find((one: Node) => one.type.endsWith("-file"))
        if (target === undefined) continue
        if (target.id === node.id) continue
        const attrs: ShSourcesFileAttrs = { specifier }
        edges.push({
          type: SH_SOURCES_FILE_EDGE_TYPE,
          from: node.id,
          to: target.id,
          attrs,
        })
      }
    }

    return { edges }
  },
})

export default shSourcesFileEdgeProducer
