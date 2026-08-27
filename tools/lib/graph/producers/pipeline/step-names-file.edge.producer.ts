import type { Repo } from "../../../../../page/document/types.ts"
import { defineEdgeProducer } from "../../define-edge-producer.ts"
import type { EdgeInit, Graph, Node } from "../../types.ts"
import { TS_FILE_NODE_TYPES } from "../file/ts-file/types.ts"
import { pathsNamedIn } from "./command-paths.ts"
import {
  STEP_NAMES_FILE_EDGE_TYPE,
  STEP_NODE_TYPE,
  StepAttrsSchema,
  type StepNamesFileAttrs,
} from "./types.ts"

const NO_ATTRS: StepNamesFileAttrs = {}

const TS_FILE_TYPES: ReadonlySet<string> = new Set(TS_FILE_NODE_TYPES)

const fileAt = (upstream: Graph, repo: Repo, path: string): Node | null => {
  const standing = upstream
    .nodesByKey(path)
    .filter((node: Node) => TS_FILE_TYPES.has(node.type) && node.repo === repo)
  const [first] = standing
  return first !== undefined && standing.length === 1 ? first : null
}

export const stepNamesFileEdgeProducer = defineEdgeProducer({
  name: "step-names-file",
  edgeTypes: [STEP_NAMES_FILE_EDGE_TYPE],
  dependsOn: ["pipeline", "file"],
  build: (_ctx, upstream) => {
    const edges: EdgeInit[] = []
    for (const step of upstream.nodes(STEP_NODE_TYPE)) {
      const { commands } = StepAttrsSchema.parse(step.attrs)
      if (commands === undefined) continue
      for (const named of pathsNamedIn(commands)) {
        const file = fileAt(upstream, named.repo, named.path)
        if (file === null) continue
        edges.push({
          type: STEP_NAMES_FILE_EDGE_TYPE,
          from: step.id,
          to: file.id,
          attrs: NO_ATTRS,
        })
      }
    }
    return { edges }
  },
})

export default stepNamesFileEdgeProducer
