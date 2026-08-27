import type { PopulationEntry } from "../graph/queries/membership.ts"
import type { NodeId } from "../graph/types.ts"
import type { PipelineEntity, WorkflowEntity } from "./entities.ts"

export type WorkflowConfig = {
  name: string
  kind?: string
  dependsOn?: readonly string[]
  whenBranch?: string
  alwaysRun?: boolean
  dispatchNodes?: readonly NodeId[]
  dispatchNodeTypes?: readonly PopulationEntry[]
  config: Record<string, unknown>
}

export type AbsorbedWorkflow = {
  workflow: WorkflowEntity
  fromPipeline: PipelineEntity
  config: Record<string, unknown>
}
