import type { Repo } from "../../../../../page/document/types.ts"
import { defineEdgeProducer } from "../../define-edge-producer.ts"
import { nodeKey } from "../../key.ts"
import type { EdgeInit, Graph } from "../../types.ts"
import {
  STEP_DEPENDS_ON_EDGE_TYPE,
  STEP_NODE_TYPE,
  STEP_OF_WORKFLOW_EDGE_TYPE,
  type StepAttrs,
  StepAttrsSchema,
  type StepDependsOnAttrs,
  type StepOfWorkflowAttrs,
  stepKey,
  WORKFLOW_DEPENDS_ON_EDGE_TYPE,
  WORKFLOW_DISPATCHES_EDGE_TYPE,
  WORKFLOW_NODE_TYPE,
  WORKFLOW_RUNS_STEP_EDGE_TYPE,
  type WorkflowAttrs,
  WorkflowAttrsSchema,
  type WorkflowDependsOnAttrs,
  type WorkflowDispatchesAttrs,
  type WorkflowRunsStepAttrs,
} from "./types.ts"

const readWorkflowAttrs = (raw: unknown): WorkflowAttrs => WorkflowAttrsSchema.parse(raw)
const readStepAttrs = (raw: unknown): StepAttrs => StepAttrsSchema.parse(raw)

const repoScope = (repo: Repo | undefined): string => repo ?? ""

const workflowScope = (repo: Repo | undefined, workflowName: string): string =>
  `${repoScope(repo)}\n${workflowName}`

const workflowId = (repo: Repo | undefined, name: string): string =>
  nodeKey({ type: WORKFLOW_NODE_TYPE, repo, key: name })

const stepId = (repo: Repo | undefined, workflowName: string, stepName: string): string =>
  nodeKey({ type: STEP_NODE_TYPE, repo, key: stepKey(workflowName, stepName) })

export const buildPipelineEdgesFromGraph = (upstream: Graph): readonly EdgeInit[] => {
  const workflowNodes = upstream.nodes(WORKFLOW_NODE_TYPE)
  const stepNodes = upstream.nodes(STEP_NODE_TYPE)

  const workflowNamesByRepo = new Map<string, Set<string>>()
  for (const w of workflowNodes) {
    const scope = repoScope(w.repo)
    let names = workflowNamesByRepo.get(scope)
    if (names === undefined) {
      names = new Set<string>()
      workflowNamesByRepo.set(scope, names)
    }
    names.add(readWorkflowAttrs(w.attrs).name)
  }

  const stepNamesByWorkflow = new Map<string, Set<string>>()
  for (const s of stepNodes) {
    const sAttrs = readStepAttrs(s.attrs)
    const scope = workflowScope(s.repo, sAttrs.workflow)
    let names = stepNamesByWorkflow.get(scope)
    if (names === undefined) {
      names = new Set<string>()
      stepNamesByWorkflow.set(scope, names)
    }
    names.add(sAttrs.name)
  }

  const edges: EdgeInit[] = []

  for (const w of workflowNodes) {
    const wAttrs = readWorkflowAttrs(w.attrs)
    const siblingWorkflows = workflowNamesByRepo.get(repoScope(w.repo)) ?? new Set<string>()
    for (const target of wAttrs.dependsOnWorkflows) {
      if (!siblingWorkflows.has(target)) continue
      const dEdge: EdgeInit<"workflow-depends-on", WorkflowDependsOnAttrs> = {
        type: WORKFLOW_DEPENDS_ON_EDGE_TYPE,
        from: w.id,
        to: workflowId(w.repo, target),
        attrs: {},
      }
      edges.push(dEdge)
    }
    for (const target of wAttrs.dispatchNodes ?? []) {
      const disEdge: EdgeInit<"workflow-dispatches", WorkflowDispatchesAttrs> = {
        type: WORKFLOW_DISPATCHES_EDGE_TYPE,
        from: w.id,
        to: target,
        attrs: {},
      }
      edges.push(disEdge)
    }
  }

  for (const s of stepNodes) {
    const sAttrs = readStepAttrs(s.attrs)

    const memberEdge: EdgeInit<"step-of-workflow", StepOfWorkflowAttrs> = {
      type: STEP_OF_WORKFLOW_EDGE_TYPE,
      from: s.id,
      to: workflowId(s.repo, sAttrs.workflow),
      attrs: {},
    }
    edges.push(memberEdge)

    const runsEdge: EdgeInit<"workflow-runs-step", WorkflowRunsStepAttrs> = {
      type: WORKFLOW_RUNS_STEP_EDGE_TYPE,
      from: workflowId(s.repo, sAttrs.workflow),
      to: s.id,
      attrs: {},
    }
    edges.push(runsEdge)

    const siblingSteps =
      stepNamesByWorkflow.get(workflowScope(s.repo, sAttrs.workflow)) ?? new Set<string>()
    for (const target of sAttrs.dependsOnSteps) {
      if (!siblingSteps.has(target)) continue
      const sdEdge: EdgeInit<"step-depends-on", StepDependsOnAttrs> = {
        type: STEP_DEPENDS_ON_EDGE_TYPE,
        from: s.id,
        to: stepId(s.repo, sAttrs.workflow, target),
        attrs: {},
      }
      edges.push(sdEdge)
    }
  }

  return edges
}

export const pipelineEdgeProducer = defineEdgeProducer({
  name: "pipeline-edge",
  edgeTypes: [
    WORKFLOW_DEPENDS_ON_EDGE_TYPE,
    WORKFLOW_DISPATCHES_EDGE_TYPE,
    STEP_DEPENDS_ON_EDGE_TYPE,
    STEP_OF_WORKFLOW_EDGE_TYPE,
    WORKFLOW_RUNS_STEP_EDGE_TYPE,
  ],
  dependsOn: ["pipeline"],
  build: (_ctx, upstream) => ({ edges: buildPipelineEdgesFromGraph(upstream) }),
})

export default pipelineEdgeProducer
