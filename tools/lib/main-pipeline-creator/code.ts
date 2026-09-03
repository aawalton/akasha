import { runGit } from "@akasha/git/git-answering"
import { getCommitTreeSha } from "@akasha/git/tree-sha"
import { buildPipelineConfigFromRaw } from "@akasha/workflow-selection/pipeline-config-building"
import { selectPipelineWorkflows } from "@akasha/workflow-selection/pipeline-workflow-selection"
import { matchesBranch } from "@akasha/workflow-selection/workflow-branch-filter"
import { askGraph } from "../graph/ask.ts"
import { pathsStandingNowhere as changedFilesMissingGraphNodes } from "../graph/queries/membership"
import type { Graph } from "../graph/types.ts"
import {
  type ShaPinnedTreeArgs,
  sweepShaPinnedTreeState,
  withShaPinnedTree,
} from "./sha-pinned-tree.ts"

export type { Graph }

export interface GitResult {
  readonly ok: boolean
  readonly stdout: string
  readonly stderr: string
}

export interface StepDefinition {
  readonly name: string
  readonly dependsOn?: readonly string[]
  readonly stepConfig?: unknown
  readonly whenConditions?: { readonly status?: readonly string[] }
  readonly alwaysRun?: boolean
}

export interface WorkflowConfigJson {
  readonly name: string
  readonly kind?: string
  readonly dispatchNodes?: readonly string[]
  readonly dependsOn?: readonly string[]
  readonly whenBranch?: string
  readonly alwaysRun?: boolean
  readonly inputsHash?: string
  readonly steps?: readonly StepDefinition[]
}

export interface PipelineEntity {
  readonly id: string
  readonly seq: number
  readonly status: string
  readonly branch: string
  readonly changedFiles?: readonly string[]
}

export interface WorkflowEntity {
  readonly id: string
  readonly pipelineId: string
  readonly pipelineSeq: number
  readonly status: string
  readonly name: string
  readonly kind?: string
  readonly dependsOn?: readonly string[]
  readonly changedFiles?: readonly string[]
}

export interface PipelineConfig {
  readonly workflows: readonly { readonly name: string }[]
  readonly changedPaths: readonly string[]
  readonly graph?: Graph
}

export interface Selection {
  readonly selected: readonly {
    readonly workflow: { readonly name: string }
    readonly changedFiles: readonly string[]
  }[]
  readonly absorbedFromPriorPipelines: readonly {
    readonly workflow: { readonly name: string }
    readonly config: Readonly<Record<string, unknown>>
  }[]
}

export interface CreatorCode {
  readonly runGit: (
    args: readonly string[],
    cwd: string,
    options?: { readonly timeoutMs?: number }
  ) => Promise<GitResult>
  readonly getCommitTreeSha: (workDir: string, commitSha: string) => Promise<string>
  readonly askGraph: typeof askGraph
  readonly changedFilesMissingGraphNodes: (
    graph: Graph,
    files: readonly string[]
  ) => readonly string[]
  readonly withShaPinnedTree: <T>(
    args: ShaPinnedTreeArgs,
    fn: (extractPath: string) => Promise<T>
  ) => Promise<T>
  readonly sweepShaPinnedTreeState: (gitDir: string, scratchRoot?: string) => Promise<void>
  readonly matchesBranch: (wf: WorkflowConfigJson, currentBranch: string) => boolean
  readonly buildPipelineConfigFromRaw: (pipeline: PipelineEntity, raw: unknown) => PipelineConfig
  readonly selectPipelineWorkflows: (input: {
    readonly pipeline: PipelineEntity
    readonly config: PipelineConfig
    readonly sameBranchPipelines: readonly PipelineEntity[]
    readonly sameBranchWorkflows: Record<string, WorkflowEntity[]>
  }) => Selection
}

export function reachCreatorCode(): CreatorCode {
  return {
    runGit,
    getCommitTreeSha,
    askGraph,
    buildPipelineConfigFromRaw,
    changedFilesMissingGraphNodes,
    matchesBranch,
    selectPipelineWorkflows,
    sweepShaPinnedTreeState,
    withShaPinnedTree,
  } as unknown as CreatorCode
}
