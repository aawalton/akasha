import type { Graph } from "../graph/types.ts"
import type { WorkflowConfig } from "./workflow-types.ts"
import { workflowWatchMatches } from "./workflow-watch-gate.ts"

export type PipelineConfig = {
  workflows: readonly WorkflowConfig[]
  changedPaths: readonly string[]
  graph?: Graph
}

export function matchesBranch(wf: WorkflowConfig, currentBranch: string): boolean {
  const filter = wf.whenBranch
  if (filter === undefined || filter === "*") return true
  if (filter.startsWith("!")) return currentBranch !== filter.slice(1)
  return filter === currentBranch
}

export function selectWorkflows(config: PipelineConfig, branch: string): readonly WorkflowConfig[] {
  const { workflows } = config

  let selected = workflows.filter((wf) => workflowWatchMatches(config, wf))

  selected = selected.filter((wf) => matchesBranch(wf, branch))

  return selected
}
