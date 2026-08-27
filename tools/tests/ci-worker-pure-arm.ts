import { createGraph } from "../lib/graph/graph.ts"
import { nodeKey } from "../lib/graph/key.ts"
import type { Edge, Graph, Node, NodeId } from "../lib/graph/types.ts"
import type { PipelineConfig } from "../lib/ci-worker-pure/select-workflows-filter.ts"
import type { PipelineEntity } from "../lib/ci-worker-pure/entities"

const CODE = "code" as const

export const codeId = (type: string, key: string): NodeId => nodeKey({ type, repo: CODE, key })

export const nodeOf = (
  type: string,
  key: string,
  attrs: Record<string, unknown> = {}
): Node => ({
  id: codeId(type, key),
  type,
  repo: CODE,
  key,
  attrs,
  derived: {},
})

export const fileNode = (type: string, path: string): Node => nodeOf(type, path, { path })

export const packageNode = (name: string, path: string): Node => nodeOf("package", name, { path })

export const edgeOf = (
  type: string,
  from: NodeId,
  to: NodeId,
  attrs: Record<string, unknown> = {}
): Edge => ({ type, from, to, attrs, derived: {} })

export const graphOf = (nodes: readonly Node[], edges: readonly Edge[]): Graph =>
  createGraph(nodes, edges)

export const stepGraph = (): Graph =>
  graphOf(
    [
      packageNode("@foo", "packages/foo"),
      packageNode("@bar", "packages/bar"),
      fileNode("ts-file", "packages/foo/x.ts"),
      fileNode("ts-file", "packages/bar/y.ts"),
    ],
    [
      edgeOf("pkg-contains-file", codeId("package", "@foo"), codeId("ts-file", "packages/foo/x.ts")),
      edgeOf("pkg-contains-file", codeId("package", "@bar"), codeId("ts-file", "packages/bar/y.ts")),
    ]
  )

export const pipelineOf = (overrides: Partial<PipelineEntity> = {}): PipelineEntity => ({
  id: "pipeline-1",
  seq: 100,
  status: "pending",
  branch: "main",
  ...overrides,
})

export const configOf = (overrides: Partial<PipelineConfig> = {}): PipelineConfig => ({
  workflows: [
    { name: "typecheck", kind: "checks", config: {} },
    { name: "lint", kind: "checks", config: {} },
    {
      name: "deploy-api",
      kind: "apps",
      dependsOn: ["typecheck", "lint"],
      whenBranch: "main",
      config: {},
    },
    { name: "cleanup", kind: "cleanup", dependsOn: ["deploy-api"], config: {} },
  ],
  changedPaths: ["packages/api/src/index.ts"],
  ...overrides,
})
