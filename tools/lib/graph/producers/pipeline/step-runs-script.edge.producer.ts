import { defineEdgeProducer } from "../../define-edge-producer.ts"
import type { EdgeInit, Graph, Node } from "../../types.ts"
import { TS_FILE_NODE_TYPES } from "../file/ts-file/types.ts"
import {
  STEP_NODE_TYPE,
  STEP_RUNS_SCRIPT_EDGE_TYPE,
  StepAttrsSchema,
  type StepRunsScriptAttrs,
} from "./types.ts"

const NO_ATTRS: StepRunsScriptAttrs = {}

const TS_FILE_TYPES: ReadonlySet<string> = new Set(TS_FILE_NODE_TYPES)

const soleNode = (nodes: readonly Node[]): Node | null => {
  const [first] = nodes
  return first !== undefined && nodes.length === 1 ? first : null
}

const reposNamed = (nodes: readonly Node[]): string =>
  nodes
    .map((node) => node.repo ?? "no repository")
    .sort()
    .join(", ")

const scriptFileFor = (upstream: Graph, step: Node, script: string): Node => {
  const standing = upstream.nodesByKey(script).filter((node) => TS_FILE_TYPES.has(node.type))
  const sole = soleNode(standing)
  if (sole !== null) return sole
  if (standing.length === 0) {
    throw new Error(
      `graph: step ${step.id} names the script ${script}, and no TypeScript file node stands at that path in any repository`
    )
  }
  const own = soleNode(standing.filter((node) => node.repo === step.repo))
  if (own !== null) return own
  throw new Error(
    `graph: step ${step.id} names the script ${script}, which stands in ${reposNamed(standing)}, and the step's own repository picks out none of them, so nothing says which file it runs`
  )
}

export const stepRunsScriptEdgeProducer = defineEdgeProducer({
  name: "step-runs-script",
  edgeTypes: [STEP_RUNS_SCRIPT_EDGE_TYPE],
  dependsOn: ["pipeline", "file"],
  build: (_ctx, upstream) => {
    const edges: EdgeInit[] = []
    for (const step of upstream.nodes(STEP_NODE_TYPE)) {
      const { script } = StepAttrsSchema.parse(step.attrs)
      if (script === undefined) continue
      edges.push({
        type: STEP_RUNS_SCRIPT_EDGE_TYPE,
        from: step.id,
        to: scriptFileFor(upstream, step, script).id,
        attrs: NO_ATTRS,
      })
    }
    return { edges }
  },
})

export default stepRunsScriptEdgeProducer
