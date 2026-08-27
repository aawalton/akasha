import type { Row, Test } from "../page-query.ts"
import type { Roots } from "../../../page/page"
import { NON_TERMINAL_PIPELINE_STATUSES } from "../ci-orchestrator/statuses.ts"
import { FAILED, PASSED, PIPELINE, STEP, WORKFLOW } from "../sweep-pipeline-pages/statuses.ts"
import {
  highestBySeq,
  readChildrenOfPipelineSeqs,
  readPages,
  readPagesBySeqs,
  readRelationSeq,
  requireSeq,
  textOf,
} from "./reads.ts"
import { BRANCH_KEY, COMMIT_KEY, NAME_KEY, PIPELINE_SEQ_KEY, SLUG_KEY, STATUS_KEY } from "./vocabulary.ts"

const DESCENDANT_PARENT_CEILING = 500

export function workflowNameOf(row: Row): string | null {
  return textOf(row, NAME_KEY) ?? textOf(row, SLUG_KEY)
}

export function readPipelinesByBranchAndCommit(
  roots: Roots,
  args: {
    readonly branch: string
    readonly commit: string
    readonly includeStatuses?: readonly string[]
  }
): readonly Row[] {
  const where: Test[] = [
    { key: BRANCH_KEY, is: args.branch },
    { key: COMMIT_KEY, is: args.commit },
  ]
  if (args.includeStatuses !== undefined) {
    if (args.includeStatuses.length === 0) return []
    where.push({ key: STATUS_KEY, in: args.includeStatuses })
  }
  return readPages(roots, { pageType: PIPELINE, where })
}

export function readLatestNonTerminalPipelineByBranchAndCommit(
  roots: Roots,
  args: { readonly branch: string; readonly commit: string }
): Row | null {
  const rows = readPipelinesByBranchAndCommit(roots, {
    branch: args.branch,
    commit: args.commit,
    includeStatuses: NON_TERMINAL_PIPELINE_STATUSES,
  })
  return highestBySeq(rows, "readLatestNonTerminalPipelineByBranchAndCommit")
}

export function readPipelineStatusesBySeqs(
  roots: Roots,
  seqs: readonly number[]
): ReadonlyMap<number, string> {
  const out = new Map<number, string>()
  for (const row of readPagesBySeqs(roots, { pageType: PIPELINE, seqs })) {
    const status = textOf(row, STATUS_KEY)
    if (status === null) continue
    out.set(requireSeq(row, "readPipelineStatusesBySeqs"), status)
  }
  return out
}

export function readWorkflowsOfPipelineSeqs(
  roots: Roots,
  args: { readonly pipelineSeqs: readonly number[]; readonly includeStatuses?: readonly string[] }
): readonly Row[] {
  return readChildrenOfPipelineSeqs(roots, {
    pageType: WORKFLOW,
    pipelineSeqs: args.pipelineSeqs,
    ...(args.includeStatuses === undefined ? {} : { includeStatuses: args.includeStatuses }),
  })
}

export function readChildWorkflowsOfPipelineSeq(
  roots: Roots,
  args: { readonly pipelineSeq: number; readonly includeStatuses: readonly string[] }
): readonly Row[] {
  return readChildrenOfPipelineSeqs(roots, {
    pageType: WORKFLOW,
    pipelineSeqs: [args.pipelineSeq],
    includeStatuses: args.includeStatuses,
  })
}

export function readChildStepsOfPipelineSeq(
  roots: Roots,
  args: { readonly pipelineSeq: number; readonly includeStatuses: readonly string[] }
): readonly Row[] {
  return readChildrenOfPipelineSeqs(roots, {
    pageType: STEP,
    pipelineSeqs: [args.pipelineSeq],
    includeStatuses: args.includeStatuses,
  })
}

export function readFailedPipelinesWithNewerSiblings(roots: Roots): readonly Row[] {
  const where = "readFailedPipelinesWithNewerSiblings"
  const failed = readPages(roots, {
    pageType: PIPELINE,
    where: [{ key: STATUS_KEY, is: FAILED }],
  })
  if (failed.length === 0) return []
  const branches = [...new Set(failed.map((row) => textOf(row, BRANCH_KEY)))].filter(
    (one): one is string => one !== null
  )
  const newestByBranch = new Map<string, number>()
  for (const branch of branches) {
    const onBranch = readPages(roots, {
      pageType: PIPELINE,
      where: [{ key: BRANCH_KEY, is: branch }],
    })
    for (const row of onBranch) {
      const seq = requireSeq(row, where)
      const standing = newestByBranch.get(branch)
      if (standing === undefined || seq > standing) newestByBranch.set(branch, seq)
    }
  }
  return failed.filter((row) => {
    const branch = textOf(row, BRANCH_KEY)
    if (branch === null) return false
    const newest = newestByBranch.get(branch)
    return newest !== undefined && newest > requireSeq(row, where)
  })
}

export interface PipelineWithNonTerminalDescendants {
  readonly seq: number
  readonly status: string | null
}

function collectParentPipelineSeqs(
  roots: Roots,
  pageType: string,
  includeStatuses: readonly string[],
  into: Set<number>
): void {
  if (includeStatuses.length === 0) return
  for (const row of readPages(roots, {
    pageType,
    where: [{ key: STATUS_KEY, in: includeStatuses }],
  })) {
    const seq = readRelationSeq(row, PIPELINE_SEQ_KEY, "collectParentPipelineSeqs")
    if (seq !== null) into.add(seq)
  }
}

export function readPipelineSeqsWithNonTerminalDescendants(
  roots: Roots,
  args: { readonly workflowStatuses: readonly string[]; readonly stepStatuses: readonly string[] }
): readonly PipelineWithNonTerminalDescendants[] {
  const parentSeqs = new Set<number>()
  collectParentPipelineSeqs(roots, WORKFLOW, args.workflowStatuses, parentSeqs)
  collectParentPipelineSeqs(roots, STEP, args.stepStatuses, parentSeqs)
  if (parentSeqs.size === 0) return []
  if (parentSeqs.size > DESCENDANT_PARENT_CEILING) {
    throw new Error(
      `readPipelineSeqsWithNonTerminalDescendants: ${parentSeqs.size} pipelines hold non-terminal ` +
        `descendants, over the ceiling of ${DESCENDANT_PARENT_CEILING}; refusing to return a ` +
        'truncated set that callers would read as "these workers are unwanted"'
    )
  }
  return readPagesBySeqs(roots, { pageType: PIPELINE, seqs: [...parentSeqs] }).map((row) => ({
    seq: requireSeq(row, "readPipelineSeqsWithNonTerminalDescendants"),
    status: textOf(row, STATUS_KEY),
  }))
}

export interface PassedWorkflowWitness {
  readonly name: string
  readonly pipelineSeq: number
}

export function readPassedWorkflowWitnessesByBranch(
  roots: Roots,
  args: { readonly branch: string; readonly afterSeq: number }
): readonly PassedWorkflowWitness[] {
  const where = "readPassedWorkflowWitnessesByBranch"
  const laterSeqs = readPages(roots, {
    pageType: PIPELINE,
    where: [{ key: BRANCH_KEY, is: args.branch }],
  })
    .map((row) => requireSeq(row, where))
    .filter((seq) => seq > args.afterSeq)
  if (laterSeqs.length === 0) return []
  const newestByName = new Map<string, number>()
  for (const row of readWorkflowsOfPipelineSeqs(roots, {
    pipelineSeqs: laterSeqs,
    includeStatuses: [PASSED],
  })) {
    const name = workflowNameOf(row)
    if (name === null) continue
    const seq = readRelationSeq(row, PIPELINE_SEQ_KEY, where)
    if (seq === null) continue
    const standing = newestByName.get(name)
    if (standing === undefined || seq > standing) newestByName.set(name, seq)
  }
  return [...newestByName]
    .map(([name, pipelineSeq]) => ({ name, pipelineSeq }))
    .sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0))
}

export interface WorkflowNameStatus {
  readonly pipelineSeq: number
  readonly name: string
  readonly status: string
}

export function readWorkflowNameStatusesOfPipelineSeqs(
  roots: Roots,
  pipelineSeqs: readonly number[]
): readonly WorkflowNameStatus[] {
  const where = "readWorkflowNameStatusesOfPipelineSeqs"
  const out: WorkflowNameStatus[] = []
  for (const row of readWorkflowsOfPipelineSeqs(roots, { pipelineSeqs })) {
    const name = workflowNameOf(row)
    const status = textOf(row, STATUS_KEY)
    if (name === null || status === null) continue
    const pipelineSeq = readRelationSeq(row, PIPELINE_SEQ_KEY, where)
    if (pipelineSeq === null) continue
    out.push({ pipelineSeq, name, status })
  }
  return out
}
