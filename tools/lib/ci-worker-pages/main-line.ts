import type { Row } from "../page-query.ts"
import type { Roots } from "../../../page/page"
import { NON_TERMINAL_PIPELINE_STATUSES } from "../ci-orchestrator/statuses.ts"
import { MAIN_BRANCH, PIPELINE, PIPELINE_TERMINAL } from "../sweep-pipeline-pages/statuses.ts"
import { readPageBySeq, readPages, requireSeq, seqIn, textOf } from "./reads.ts"
import {
  BRANCH_KEY,
  COMMIT_KEY,
  MAIN_COMMIT_KEY,
  MAIN_PREDECESSOR_SEQS_KEY,
  MERGE_QUEUE,
  STATUS_KEY,
} from "./vocabulary.ts"

export function readMainPipelinesBeforeSeqDesc(
  roots: Roots,
  lessThanSeq: number
): readonly Row[] {
  const where = "readMainPipelinesBeforeSeqDesc"
  return readPages(roots, {
    pageType: PIPELINE,
    where: [{ key: BRANCH_KEY, is: MAIN_BRANCH }],
    order: "desc",
  }).filter((row) => requireSeq(row, where) < lessThanSeq)
}

export function readTerminalMainPipelinesAsc(roots: Roots): readonly Row[] {
  return readPages(roots, {
    pageType: PIPELINE,
    where: [
      { key: BRANCH_KEY, is: MAIN_BRANCH },
      { key: STATUS_KEY, in: [...PIPELINE_TERMINAL] },
    ],
  })
}

export function readNonTerminalMainPipelines(roots: Roots): readonly Row[] {
  return readPages(roots, {
    pageType: PIPELINE,
    where: [
      { key: BRANCH_KEY, is: MAIN_BRANCH },
      { key: STATUS_KEY, in: NON_TERMINAL_PIPELINE_STATUSES },
    ],
  })
}

export interface MainPipelineSeed {
  readonly seq: number
  readonly commit: string
  readonly status: string
  readonly branch: string | null
}

export function readMainPipelineSeedsByCommits(
  roots: Roots,
  commits: readonly string[]
): readonly MainPipelineSeed[] {
  if (commits.length === 0) return []
  const out: MainPipelineSeed[] = []
  for (const row of readPages(roots, {
    pageType: PIPELINE,
    where: [{ key: COMMIT_KEY, in: commits }],
  })) {
    const commit = textOf(row, COMMIT_KEY)
    const status = textOf(row, STATUS_KEY)
    if (commit === null || status === null) continue
    out.push({
      seq: requireSeq(row, "readMainPipelineSeedsByCommits"),
      commit,
      status,
      branch: textOf(row, BRANCH_KEY),
    })
  }
  return out
}

export function readMergeQueueMainCommit(roots: Roots): string | null {
  const rows = readPages(roots, { pageType: MERGE_QUEUE, limit: 2 })
  if (rows.length > 1) {
    throw new Error(
      `readMergeQueueMainCommit: ${rows.length} merge-queue pages stand, so the singleton cannot be named`
    )
  }
  const row = rows[0]
  return row === undefined ? null : textOf(row, MAIN_COMMIT_KEY)
}

export interface PipelineRoot {
  readonly seq: number
  readonly branch: string | null
  readonly mainPredecessorSeqs: readonly number[]
}

export function readPipelineRootBySeq(roots: Roots, seq: number): PipelineRoot | null {
  const row = readPageBySeq(roots, { pageType: PIPELINE, seq })
  if (row === null) return null
  const stated = row.values[MAIN_PREDECESSOR_SEQS_KEY]
  const predecessors: number[] = []
  for (const one of Array.isArray(stated) ? stated : []) {
    const parsed = seqIn(one)
    if (parsed !== null) predecessors.push(parsed)
  }
  return {
    seq: requireSeq(row, "readPipelineRootBySeq"),
    branch: textOf(row, BRANCH_KEY),
    mainPredecessorSeqs: predecessors,
  }
}
