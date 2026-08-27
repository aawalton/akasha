import { patchPage } from "../page-write.ts"
import type { Roots } from "../../../page/page"
import { NON_TERMINAL_PIPELINE_STATUSES } from "../ci-orchestrator/statuses.ts"
import {
  MAIN_BRANCH,
  OVERTAKEN,
  overtakenByNewerOnBranch,
  PIPELINE,
  PIPELINE_TERMINAL,
  UNDERWAY,
} from "../sweep-pipeline-pages/statuses.ts"
import {
  readLatestNonTerminalPipelineByBranchAndCommit,
  readPipelinesByBranchAndCommit,
} from "./loaders.ts"
import { readPageBySeq, readPages, readRelationSeq, requireSeq, textOf } from "./reads.ts"
import { BRANCH_KEY, OVERTAKEN_BY_SEQ_KEY, STATUS_KEY } from "./vocabulary.ts"

export interface Standing {
  readonly seq: number
  readonly status: string
}

export interface Overtaking {
  readonly took: readonly number[]
  readonly raced: readonly number[]
}

export function adoptedPipelineSeq(
  roots: Roots,
  args: { readonly branch: string; readonly commit: string }
): number | null {
  const standing = readLatestNonTerminalPipelineByBranchAndCommit(roots, args)
  return standing === null ? null : requireSeq(standing, "adoptedPipelineSeq")
}

export function mainPredecessorSeqs(roots: Roots): readonly number[] {
  const where = "mainPredecessorSeqs"
  const seqs: number[] = []
  for (const row of readPages(roots, {
    pageType: PIPELINE,
    where: [
      { key: BRANCH_KEY, is: MAIN_BRANCH },
      { key: STATUS_KEY, in: [...UNDERWAY] },
    ],
  })) {
    if (readRelationSeq(row, OVERTAKEN_BY_SEQ_KEY, where) !== null) continue
    seqs.push(requireSeq(row, where))
  }
  return seqs.sort((a, b) => a - b)
}

export function predecessorsToOvertake(
  roots: Roots,
  args: { readonly branch: string; readonly ownSeq: number }
): readonly Standing[] {
  const where = "predecessorsToOvertake"
  const out: Standing[] = []
  for (const row of readPages(roots, {
    pageType: PIPELINE,
    where: [
      { key: BRANCH_KEY, is: args.branch },
      { key: STATUS_KEY, in: NON_TERMINAL_PIPELINE_STATUSES },
    ],
  })) {
    const seq = requireSeq(row, where)
    if (seq === args.ownSeq) continue
    const status = textOf(row, STATUS_KEY)
    if (status === null) continue
    if (!overtakenByNewerOnBranch(args.branch, status)) continue
    out.push({ seq, status })
  }
  return out
}

function standingStatusOf(roots: Roots, seq: number): string | null {
  const row = readPageBySeq(roots, { pageType: PIPELINE, seq })
  return row === null ? null : textOf(row, STATUS_KEY)
}

export function overtakePipelines(
  roots: Roots,
  standing: readonly Standing[],
  bySeq: number
): Overtaking {
  const took: number[] = []
  const raced: number[] = []
  for (const one of standing) {
    if (standingStatusOf(roots, one.seq) !== one.status) {
      raced.push(one.seq)
      continue
    }
    const landed = patchPage(roots, PIPELINE, String(one.seq), {
      [STATUS_KEY]: OVERTAKEN,
      [OVERTAKEN_BY_SEQ_KEY]: bySeq,
    })
    if (landed === null) raced.push(one.seq)
    else took.push(one.seq)
  }
  return { took, raced }
}

export function stampOvertakenOnTerminalSameCommit(
  roots: Roots,
  args: {
    readonly branch: string
    readonly commit: string
    readonly ownSeq: number
    readonly bySeq: number
  }
): readonly number[] {
  const where = "stampOvertakenOnTerminalSameCommit"
  const stamped: number[] = []
  for (const row of readPipelinesByBranchAndCommit(roots, {
    branch: args.branch,
    commit: args.commit,
    includeStatuses: [...PIPELINE_TERMINAL],
  })) {
    const seq = requireSeq(row, where)
    if (seq === args.ownSeq) continue
    if (readRelationSeq(row, OVERTAKEN_BY_SEQ_KEY, where) !== null) continue
    const landed = patchPage(roots, PIPELINE, String(seq), {
      [OVERTAKEN_BY_SEQ_KEY]: args.bySeq,
    })
    if (landed !== null) stamped.push(seq)
  }
  return stamped
}
