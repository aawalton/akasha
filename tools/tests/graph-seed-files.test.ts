import { describe, expect, it } from "bun:test"
import { createGraph } from "../lib/graph/graph.ts"
import { type SeedSource, seedFilesFor } from "../lib/graph/queries/seed-files.ts"
import type { Edge, Graph, Node } from "../lib/graph/types.ts"
import { importEdge, tsFile } from "./graph-closure-arm.ts"

const SVC = "pgbouncer"
const WORKFLOW_SRC = "packages/infra/k8s/pgbouncer/foundation.workflow.ts"
const SYNTH_SRC = "packages/infra/k8s/pgbouncer/synth.ts"
const GENERATED_YAML = "packages/infra/k8s/pgbouncer/generated/configmap.generated.yaml"
const TYPES_SRC = "packages/infra/k8s-types/src/types.ts"
const STEP_DOCKERFILE = "packages/infra/k8s/postgres/build/Dockerfile"
const RESOURCE_KEY = "ConfigMap/pgbouncer/pgbouncer"

const WORKFLOW_ID = `workflow:code:${SVC}`
const RESOURCE_ID = `k8s-resource:code:${RESOURCE_KEY}`
const STEP_ID = `dockerfile-file:code:${STEP_DOCKERFILE}`

const tsId = (path: string): string => `ts-file:code:${path}`

const nodeOf = (
  id: string,
  type: string,
  key: string,
  attrs: Record<string, unknown>
): Node => ({ id, type, repo: "code", key, attrs, derived: {} })

const workflowNode = (): Node => nodeOf(WORKFLOW_ID, "workflow", SVC, { sourcePath: WORKFLOW_SRC })

const resourceNode = (path: string): Node =>
  nodeOf(RESOURCE_ID, "k8s-resource", RESOURCE_KEY, { path })

const dockerfileNode = (): Node =>
  nodeOf(STEP_ID, "dockerfile-file", STEP_DOCKERFILE, { path: STEP_DOCKERFILE })

const synthGeneratedBy = (): Edge => ({
  type: "synth-generated-by",
  from: RESOURCE_ID,
  to: tsId(SYNTH_SRC),
  attrs: {},
  derived: {},
})

const filesOf = (graph: Graph, source: SeedSource) =>
  seedFilesFor(graph, [source]).find((one) => one.name === source.name)?.files ?? []

const filesFor = (graph: Graph, source: SeedSource): readonly string[] =>
  filesOf(graph, source).map((one) => one.path)

const asked: SeedSource = { name: SVC, nodes: [WORKFLOW_ID] }

const askedWithStep: SeedSource = {
  name: SVC,
  nodes: [WORKFLOW_ID],
  steps: [{ nodes: [STEP_ID] }],
}

const askedWithResource: SeedSource = { name: SVC, nodes: [WORKFLOW_ID, RESOURCE_ID] }

describe("seedFilesFor — a seed file names the repository it stands in", () => {
  it("carries the repository of the node that named the file", () => {
    const graph = createGraph([workflowNode()], [])
    expect(filesOf(graph, asked)).toContainEqual({ repo: "code", path: WORKFLOW_SRC })
  })
})

describe("seedFilesFor — a step's seeds enter only when the ask carries them", () => {
  it("leaves a step-only seed out when the ask names no step", () => {
    const graph = createGraph([workflowNode(), dockerfileNode()], [])
    const files = filesFor(graph, asked)
    expect(files).toContain(WORKFLOW_SRC)
    expect(files).not.toContain(STEP_DOCKERFILE)
  })

  it("folds a step-only seed in when the ask names the step", () => {
    const graph = createGraph([workflowNode(), dockerfileNode()], [])
    const files = filesFor(graph, askedWithStep)
    expect(files).toContain(WORKFLOW_SRC)
    expect(files).toContain(STEP_DOCKERFILE)
  })
})

describe("seedFilesFor — a synth-generated-by edge names the module that generates the resource", () => {
  it("names synth.ts where the resource node holds the generated yaml", () => {
    const graph = createGraph(
      [workflowNode(), resourceNode(GENERATED_YAML), tsFile(SYNTH_SRC)],
      [synthGeneratedBy()]
    )
    const files = filesFor(graph, askedWithResource)
    expect(files).toContain(SYNTH_SRC)
    expect(files).toContain(WORKFLOW_SRC)
  })

  it("names synth.ts where the synth pass won the resource node instead", () => {
    const graph = createGraph([workflowNode(), resourceNode(SYNTH_SRC)], [])
    expect(filesFor(graph, askedWithResource)).toContain(SYNTH_SRC)
  })
})

describe("seedFilesFor — the import graph out of synth.ts", () => {
  const graphImporting = (typeOnly: boolean): Graph =>
    createGraph(
      [workflowNode(), resourceNode(GENERATED_YAML), tsFile(SYNTH_SRC), tsFile(TYPES_SRC)],
      [synthGeneratedBy(), importEdge(tsId(SYNTH_SRC), tsId(TYPES_SRC), typeOnly)]
    )

  it("leaves out a type-only import, which erases before anything runs", () => {
    const files = filesFor(graphImporting(true), askedWithResource)
    expect(files).toContain(SYNTH_SRC)
    expect(files).not.toContain(TYPES_SRC)
  })

  it("takes in a value import, which does not erase", () => {
    const files = filesFor(graphImporting(false), askedWithResource)
    expect(files).toContain(SYNTH_SRC)
    expect(files).toContain(TYPES_SRC)
  })
})
