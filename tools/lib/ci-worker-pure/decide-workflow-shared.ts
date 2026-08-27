import type { WhenConditions, WorkflowEntity } from "./entities"

export type WorkflowStepDefinition = {
  name: string
  dependsOn?: readonly string[]
  whenConditions?: WhenConditions
  alwaysRun?: boolean
}

export type DecideWorkflowConfig = {
  stepDefinitions?: readonly WorkflowStepDefinition[]
  commitSha?: string
}

export type NormalizedConfig = {
  stepDefinitions: readonly WorkflowStepDefinition[]
  commitSha: string
}

export function normalizeConfig(raw: DecideWorkflowConfig): NormalizedConfig {
  return {
    stepDefinitions: raw.stepDefinitions ?? [],
    commitSha: raw.commitSha ?? "",
  }
}

export function buildDeployStatePatch(
  workflow: WorkflowEntity,
  commitSha: string
): { extraPatch?: Record<string, unknown> } {
  const patch: Record<string, unknown> = {}
  if (commitSha.length > 0) patch.deployedCommitSha = commitSha
  if (workflow.inputsHash !== undefined) patch.deployedInputsHash = workflow.inputsHash
  return Object.keys(patch).length === 0 ? {} : { extraPatch: patch }
}
