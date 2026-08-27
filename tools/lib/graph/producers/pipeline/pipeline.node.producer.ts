import type { Repo } from "../../../../../page/document/types.ts"
import { defineNodeProducer } from "../../define-node-producer.ts"
import type { NodeInit } from "../../types.ts"
import { discoverPipelineWorkflows } from "./discover.ts"
import type { ExtractedStep, ExtractedWorkflow } from "./workflow-extract.ts"
import {
  PIPELINE_REPO,
  STEP_NODE_TYPE,
  type StepAttrs,
  stepKey,
  WORKFLOW_NODE_TYPE,
  type WorkflowAttrs,
} from "./types.ts"

const buildWorkflowAttrs = (w: ExtractedWorkflow): WorkflowAttrs => ({
  name: w.name,
  kind: w.kind,
  sourcePath: w.sourcePath,
  ...(w.package !== undefined && { package: w.package }),
  ...(w.disabled !== undefined && { disabled: w.disabled }),
  ...(w.alwaysRun !== undefined && { alwaysRun: w.alwaysRun }),
  ...(w.branch !== undefined && { branch: w.branch }),
  dependsOnWorkflows: [...w.dependsOn],
  ...(w.dispatchNodes !== undefined && { dispatchNodes: [...w.dispatchNodes] }),
  ...(w.dispatchNodeTypes !== undefined && { dispatchNodeTypes: [...w.dispatchNodeTypes] }),
})

const buildStepAttrs = (parentName: string, s: ExtractedStep): StepAttrs => ({
  name: s.name,
  workflow: parentName,
  image: s.image,
  ...(s.alwaysRun !== undefined && { alwaysRun: s.alwaysRun }),
  dependsOnSteps: [...s.dependsOn],
  ...(s.script !== undefined && { script: s.script }),
  ...(s.commands !== undefined && { commands: [...s.commands] }),
})

export const buildPipelineNodes = (
  repo: Repo,
  workflows: readonly ExtractedWorkflow[]
): readonly NodeInit[] => {
  const nodes: NodeInit[] = []
  for (const w of workflows) {
    const wNode: NodeInit<"workflow", WorkflowAttrs> = {
      type: WORKFLOW_NODE_TYPE,
      repo,
      key: w.name,
      attrs: buildWorkflowAttrs(w),
    }
    nodes.push(wNode)

    for (const s of w.steps) {
      const sNode: NodeInit<"step", StepAttrs> = {
        type: STEP_NODE_TYPE,
        repo,
        key: stepKey(w.name, s.name),
        attrs: buildStepAttrs(w.name, s),
      }
      nodes.push(sNode)
    }
  }
  return nodes
}

export const pipelineNodeProducer = defineNodeProducer({
  name: "pipeline",
  nodeTypes: [WORKFLOW_NODE_TYPE, STEP_NODE_TYPE],
  build: (ctx) => ({
    nodes: buildPipelineNodes(PIPELINE_REPO, discoverPipelineWorkflows(ctx)),
  }),
})

export default pipelineNodeProducer
