import { defineEdgeProducer } from "../../../define-edge-producer.ts"
import { readRepoFile } from "../../../repos.ts"
import type { EdgeInit, Node } from "../../../types.ts"
import { TS_FILE_NODE_TYPE } from "../ts-file/types.ts"
import { compiledEntries } from "./compiled-entries.ts"
import {
  DOCKERFILE_COMPILES_ENTRY_EDGE_TYPE,
  DOCKERFILE_FILE_NODE_TYPE,
  type DockerfileCompilesEntryAttrs,
} from "./types.ts"

export const dockerfileCompilesEntryEdgeProducer = defineEdgeProducer({
  name: "dockerfile-compiles-entry",
  edgeTypes: [DOCKERFILE_COMPILES_ENTRY_EDGE_TYPE],
  dependsOn: ["file"],
  build: (ctx, graph) => {
    const edges: EdgeInit[] = []
    const attrs: DockerfileCompilesEntryAttrs = {}

    for (const node of graph.nodes(DOCKERFILE_FILE_NODE_TYPE)) {
      const repo = node.repo
      if (repo === undefined) continue
      const text = readRepoFile(ctx, repo, String(node.key))
      if (text === null) continue
      for (const entry of compiledEntries(text)) {
        const target = graph
          .nodesByKey(entry, repo)
          .find((one: Node) => one.type === TS_FILE_NODE_TYPE)
        if (target === undefined) continue
        edges.push({
          type: DOCKERFILE_COMPILES_ENTRY_EDGE_TYPE,
          from: node.id,
          to: target.id,
          attrs,
        })
      }
    }

    return { edges }
  },
})

export default dockerfileCompilesEntryEdgeProducer
