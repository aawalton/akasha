import {
  type ClosureMembership,
  MEMBERSHIP_ALL,
  resolveClosureMembership,
} from "../graph/queries/membership.ts"
import { closureIntersectsChangedFiles } from "./closure-reach.ts"
import type { PipelineConfig } from "./select-workflows-filter.ts"
import type { WorkflowConfig } from "./workflow-types.ts"

export function workflowWatchMatches(config: PipelineConfig, wf: WorkflowConfig): boolean {
  if (wf.alwaysRun === true) return true
  if (config.graph === undefined) return true
  return closureIntersectsChangedFiles(
    config.graph,
    { nodes: wf.dispatchNodes, nodeTypes: wf.dispatchNodeTypes },
    config.changedPaths
  )
}

export function workflowWatchMembership(
  config: PipelineConfig,
  wf: WorkflowConfig
): ClosureMembership {
  if (config.graph === undefined) return MEMBERSHIP_ALL
  return resolveClosureMembership(config.graph, {
    nodes: wf.dispatchNodes,
    nodeTypes: wf.dispatchNodeTypes,
  })
}
