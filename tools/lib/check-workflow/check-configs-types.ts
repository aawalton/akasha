import type { NodeId } from "../graph/types.ts"
import type { PopulationEntry, ScopedPopulation } from "../graph/queries/membership.ts"
import type { BackendOptions, CIContext, SecretRef } from "../workflow-dsl/types.ts"
export const treeShaArgs = (ci: CIContext): readonly string[] => ["--tree-sha", ci.treeSha]

export const WORKFLOW_SURFACE_POPULATION: ScopedPopulation = {
  kind: "ts-file",
  under: "tools/lib/workflow-surface",
}

export const WORKFLOW_DSL_POPULATION: ScopedPopulation = {
  kind: "ts-file",
  under: "tools/lib/workflow-dsl",
}

export const TS_POPULATION: readonly PopulationEntry[] = ["ts-file", "tsx-file"]

export const TS_GRAPH_INPUT_POPULATION: readonly PopulationEntry[] = [...TS_POPULATION, "tsconfig-file"]

interface CheckConfigCommon {
  name: string
  image?: string
  volumes?: readonly string[]
  environment?: Record<string, string | SecretRef>
  backendOptions?: BackendOptions
  rendersVerdict?: false
  dispatchNodes?: readonly NodeId[]
  dispatchNodeTypes?: readonly (PopulationEntry | ScopedPopulation)[]
  dependsOn?: readonly string[]
  closurePolicy?: "import-graph"
  alwaysRun?: boolean
}

export interface ScriptCheckConfig extends CheckConfigCommon {
  script: string
  args?: (ci: CIContext) => readonly string[]
  commands?: never
}

export interface CommandCheckConfig extends CheckConfigCommon {
  commands: (ci: CIContext) => readonly string[]
  script?: never
  args?: never
}

export type CheckConfig = ScriptCheckConfig | CommandCheckConfig
