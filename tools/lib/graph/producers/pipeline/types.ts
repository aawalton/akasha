import { z } from "zod"
import type { Repo } from "../../../../../page/document/types.ts"

export const PIPELINE_REPO: Repo = "instructions"

export type WorkflowKind = "preparation" | "foundation" | "checks" | "apps" | "cleanup"

export type ScopedPopulation = {
  readonly kind: string
  readonly under: string
}

export type PopulationEntry = string | ScopedPopulation

export type WorkflowAttrs = {
  readonly name: string
  readonly kind: WorkflowKind
  readonly sourcePath: string
  readonly package?: string
  readonly disabled?: boolean
  readonly alwaysRun?: boolean
  readonly branch?: string
  readonly dependsOnWorkflows: readonly string[]
  readonly dispatchNodes?: readonly string[]
  readonly dispatchNodeTypes?: readonly PopulationEntry[]
}

export type StepAttrs = {
  readonly name: string
  readonly workflow: string
  readonly image: string
  readonly alwaysRun?: boolean
  readonly dependsOnSteps: readonly string[]
  readonly script?: string
  readonly commands?: readonly string[]
}

export type WorkflowDependsOnAttrs = Record<string, never>
export type StepDependsOnAttrs = Record<string, never>
export type StepOfWorkflowAttrs = Record<string, never>
export type WorkflowRunsStepAttrs = Record<string, never>
export type StepRunsScriptAttrs = Record<string, never>
export type StepNamesFileAttrs = Record<string, never>
export type WorkflowOfPackageAttrs = Record<string, never>
export type WorkflowDispatchesAttrs = Record<string, never>

export type WorkflowNodeType = "workflow"
export type StepNodeType = "step"
export type WorkflowDependsOnEdgeType = "workflow-depends-on"
export type StepDependsOnEdgeType = "step-depends-on"
export type StepOfWorkflowEdgeType = "step-of-workflow"
export type WorkflowRunsStepEdgeType = "workflow-runs-step"
export type StepRunsScriptEdgeType = "step-runs-script"
export type StepNamesFileEdgeType = "step-names-file"
export type WorkflowOfPackageEdgeType = "workflow-of-package"
export type WorkflowDispatchesEdgeType = "workflow-dispatches"

export const WORKFLOW_NODE_TYPE: WorkflowNodeType = "workflow"
export const STEP_NODE_TYPE: StepNodeType = "step"
export const WORKFLOW_DEPENDS_ON_EDGE_TYPE: WorkflowDependsOnEdgeType = "workflow-depends-on"
export const STEP_DEPENDS_ON_EDGE_TYPE: StepDependsOnEdgeType = "step-depends-on"
export const STEP_OF_WORKFLOW_EDGE_TYPE: StepOfWorkflowEdgeType = "step-of-workflow"
export const WORKFLOW_RUNS_STEP_EDGE_TYPE: WorkflowRunsStepEdgeType = "workflow-runs-step"
export const STEP_RUNS_SCRIPT_EDGE_TYPE: StepRunsScriptEdgeType = "step-runs-script"
export const STEP_NAMES_FILE_EDGE_TYPE: StepNamesFileEdgeType = "step-names-file"
export const WORKFLOW_OF_PACKAGE_EDGE_TYPE: WorkflowOfPackageEdgeType = "workflow-of-package"
export const WORKFLOW_DISPATCHES_EDGE_TYPE: WorkflowDispatchesEdgeType = "workflow-dispatches"

export const WorkflowKindSchema = z.enum(["preparation", "foundation", "checks", "apps", "cleanup"])

export const ScopedPopulationSchema = z
  .object({
    kind: z.string(),
    under: z.string(),
  })
  .passthrough()

export const PopulationEntrySchema = z.union([z.string(), ScopedPopulationSchema])

export const WorkflowAttrsSchema = z
  .object({
    name: z.string(),
    kind: WorkflowKindSchema,
    sourcePath: z.string(),
    package: z.string().optional(),
    disabled: z.boolean().optional(),
    alwaysRun: z.boolean().optional(),
    branch: z.string().optional(),
    dependsOnWorkflows: z.array(z.string()),
    dispatchNodes: z.array(z.string()).optional(),
    dispatchNodeTypes: z.array(PopulationEntrySchema).optional(),
  })
  .passthrough()

export const StepAttrsSchema = z
  .object({
    name: z.string(),
    workflow: z.string(),
    image: z.string(),
    alwaysRun: z.boolean().optional(),
    dependsOnSteps: z.array(z.string()),
    script: z.string().optional(),
    commands: z.array(z.string()).optional(),
  })
  .passthrough()

export const stepKey = (workflowName: string, stepName: string): string =>
  `${workflowName}:${stepName}`
