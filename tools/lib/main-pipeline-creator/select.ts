import type { Roots } from "@akasha/pages-system/markdown-page-at"
import { overtakenByNewerOnBranch } from "@akasha/pipeline-sweep/pipeline-page-statuses"
import type {
  CreatorCode,
  Graph,
  PipelineEntity,
  WorkflowConfigJson,
  WorkflowEntity,
} from "./code.ts"
import {
  liveWorkflowsOf,
  MAIN_BRANCH,
  type PipelineRow,
  UNDERWAY_PIPELINE_STATUSES,
  unfinishedPipelines,
} from "./pages.ts"
import { statusAsCodeRepoSpells } from "./vocabulary.ts"

const PENDING = "pending"

const SYNTHETIC_ID = "<pending>"

const NAMED_CAP = 5

const LOG = "main-pipeline-creator:"

export interface Chosen {
  readonly config: WorkflowConfigJson
  readonly changedFiles: readonly string[]
}

export interface Choice {
  readonly workflows: readonly Chosen[]
  readonly mainPredecessorSeqs: readonly number[]
  readonly overtakenSeqs: readonly number[]
}

export interface ChoiceArgs {
  readonly branch: string
  readonly selectAs?: string
  readonly changedFiles: readonly string[]
  readonly configs: readonly WorkflowConfigJson[]
  readonly graph: Graph
  readonly everyWorkflowOn?: string
}

function pipelineEntityOf(row: PipelineRow, branch: string): PipelineEntity {
  return {
    id: String(row.seq),
    seq: row.seq,
    status: statusAsCodeRepoSpells(row.status),
    branch,
    changedFiles: row.changedFiles,
  }
}

function seedsStandingNowhere(
  graph: Graph,
  configs: readonly WorkflowConfigJson[]
): readonly string[] {
  const named: string[] = []
  for (const one of configs) {
    for (const seed of one.dispatchNodes ?? []) {
      if (graph.node(seed) === undefined) named.push(`${one.name} names ${seed}`)
    }
  }
  return named
}

function changedFilesIn(config: Readonly<Record<string, unknown>>): readonly string[] {
  const held = config.changedFiles
  return Array.isArray(held) ? held.filter((one): one is string => typeof one === "string") : []
}

export function chooseWorkflows(roots: Roots, code: CreatorCode, args: ChoiceArgs): Choice {
  const standing = unfinishedPipelines(roots, args.branch)
  const mainPredecessorSeqs =
    args.branch === MAIN_BRANCH
      ? standing
          .filter((one) => UNDERWAY_PIPELINE_STATUSES.includes(one.status))
          .map((one) => one.seq)
      : []
  const overtakenSeqs = standing
    .filter((one) => overtakenByNewerOnBranch(args.branch, one.status))
    .map((one) => one.seq)

  const wholeSurfaceOf = args.everyWorkflowOn
  if (wholeSurfaceOf !== undefined) {
    return {
      workflows: args.configs
        .filter((config) => code.matchesBranch(config, wholeSurfaceOf))
        .map((config) => ({ config, changedFiles: args.changedFiles })),
      mainPredecessorSeqs,
      overtakenSeqs,
    }
  }

  const nowhere = seedsStandingNowhere(args.graph, args.configs)
  if (nowhere.length > 0) {
    const overflow = nowhere.length > NAMED_CAP ? ` (+${nowhere.length - NAMED_CAP} more)` : ""
    throw new Error(
      `${LOG} unresolved dispatch seed — ${nowhere.length} workflow(s) name a graph node that ` +
        "does not stand, so nothing they watch is reached and they would be skipped rather than " +
        `run; refusing to create a pipeline that would under-dispatch. Named: ${nowhere.slice(0, NAMED_CAP).join(", ")}${overflow}`
    )
  }

  const sameBranchPipelines = standing.map((one) => pipelineEntityOf(one, args.branch))

  const sameBranchWorkflows: Record<string, WorkflowEntity[]> = {}
  for (const workflow of liveWorkflowsOf(
    roots,
    standing.map((one) => one.seq)
  )) {
    const at = String(workflow.pipelineSeq)
    const held = sameBranchWorkflows[at] ?? []
    held.push({
      id: String(workflow.seq),
      pipelineId: at,
      pipelineSeq: workflow.pipelineSeq,
      status: statusAsCodeRepoSpells(workflow.status),
      name: workflow.name,
      ...(workflow.kind === null ? {} : { kind: workflow.kind }),
      dependsOn: workflow.dependsOn,
      changedFiles: workflow.changedFiles,
    })
    sameBranchWorkflows[at] = held
  }

  const pipeline: PipelineEntity = {
    id: SYNTHETIC_ID,
    seq: Number.MAX_SAFE_INTEGER,
    status: PENDING,
    branch: args.selectAs ?? args.branch,
    changedFiles: args.changedFiles,
  }

  const selection = code.selectPipelineWorkflows({
    pipeline,
    config: { ...code.buildPipelineConfigFromRaw(pipeline, args.configs), graph: args.graph },
    sameBranchPipelines,
    sameBranchWorkflows,
  })

  const byName = new Map<string, WorkflowConfigJson>()
  for (const config of args.configs) byName.set(config.name, config)

  const workflows: Chosen[] = []
  for (const one of selection.selected) {
    const config = byName.get(one.workflow.name)
    if (config === undefined) continue
    workflows.push({ config, changedFiles: one.changedFiles })
  }
  for (const one of selection.absorbedFromPriorPipelines) {
    const config = byName.get(one.workflow.name)
    if (config === undefined) continue
    workflows.push({ config, changedFiles: changedFilesIn(one.config) })
  }

  return { workflows, mainPredecessorSeqs, overtakenSeqs }
}
