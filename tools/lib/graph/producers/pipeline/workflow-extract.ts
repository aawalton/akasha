import { oldGraphGone } from "../../graph-gone.ts"
import type { PopulationEntry } from "./types.ts"
import type { SourceTree } from "./workflow-modules.ts"

export type WorkflowKind = "preparation" | "foundation" | "checks" | "apps" | "cleanup"
export type Extraction = {
  readonly workflows: readonly ExtractedWorkflow[]
  readonly gaps: readonly ExtractionGap[]
}
export type ExtractedWorkflow = {
  readonly name: string
  readonly kind: WorkflowKind
  readonly sourcePath: string
  readonly package?: string
  readonly disabled?: boolean
  readonly alwaysRun?: boolean
  readonly branch?: string
  readonly dependsOn: readonly string[]
  readonly dispatchNodes?: readonly string[]
  readonly dispatchNodeTypes?: readonly PopulationEntry[]
  readonly steps: readonly ExtractedStep[]
}
export type ExtractedStep = {
  readonly name: string
  readonly image: string
  readonly alwaysRun?: boolean
  readonly dependsOn: readonly string[]
  readonly script?: string
  readonly commands?: readonly string[]
}
export type ExtractionGap = {
  readonly sourcePath: string
  readonly declaredIn: string
  readonly line: number
  readonly workflow: string | null
  readonly construct: string
  readonly text: string
}
export type WorkflowSource = {
  readonly sourcePath: string
  readonly kind: WorkflowKind
}
export const extractWorkflows: (
  tree: SourceTree,
  sources: readonly WorkflowSource[]
) => Extraction = () => oldGraphGone("extractWorkflows")
