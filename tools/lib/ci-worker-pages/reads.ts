import { answer, type Row, type Test, UNREACHED } from "../page-query.ts"
import { listOf as listIn, textOf as textIn } from "../page-query-values.ts"
import type { Roots } from "../../../page/page"
import { PIPELINE, STEP } from "../sweep-pipeline-pages/statuses.ts"
import {
  BRANCH_KEY,
  PIPELINE_SEQ_KEY,
  SEQ_KEY,
  STATUS_KEY,
  WORKFLOW_SEQ_KEY,
} from "./vocabulary.ts"

export const LOG = "ci-worker-pages"

export const LOAD_LIMIT = 500

export type SeqOrdering = "asc" | "desc"

export interface ReadArgs {
  readonly pageType: string
  readonly where?: readonly Test[]
  readonly order?: SeqOrdering
  readonly limit?: number
}

export function readPages(roots: Roots, args: ReadArgs): readonly Row[] {
  const held = answer(roots, {
    pageType: args.pageType,
    ...(args.where === undefined ? {} : { where: args.where }),
    sortBy: SEQ_KEY,
    ...(args.order === "desc" ? { descending: true } : {}),
    limit: args.limit ?? LOAD_LIMIT,
  })
  if (held === null) {
    throw new Error(`${LOG}: \`${args.pageType}\` ${UNREACHED}, so nothing could be read for it`)
  }
  return held.rows
}

export function textOf(row: Row, key: string): string | null {
  const one = textIn(row.values, key)
  return one === null || one.trim() === "" ? null : one
}

export function listOf(row: Row, key: string): readonly string[] {
  return listIn(row.values, key)
}

export function seqIn(stated: string): number | null {
  if (!/^\d+$/.test(stated)) return null
  const seq = Number.parseInt(stated, 10)
  return Number.isSafeInteger(seq) && seq > 0 ? seq : null
}

export function seqOf(row: Row, key: string): number | null {
  const one = textOf(row, key)
  return one === null ? null : seqIn(one)
}

export function requireSeq(row: Row, where: string): number {
  const seq = seqOf(row, SEQ_KEY)
  if (seq === null) {
    throw new Error(
      `${where}: ${row.at} states no seq, so it can be neither addressed nor ordered; every CI page states one`
    )
  }
  return seq
}

export function readRelationSeq(row: Row, key: string, where: string): number | null {
  const one = textOf(row, key)
  if (one === null) return null
  const seq = seqOf(row, key)
  if (seq === null) {
    throw new Error(`${where}.${key}: ${row.at} states \`${one}\`, which names no page`)
  }
  return seq
}

export function isSeq(key: string, seq: number): Test {
  return { key, is: String(seq) }
}

export function inSeqs(key: string, seqs: readonly number[]): Test {
  return { key, in: seqs.map(String) }
}

export function highestBySeq(rows: readonly Row[], where: string): Row | null {
  let best: Row | null = null
  let bestSeq = Number.NEGATIVE_INFINITY
  for (const row of rows) {
    const seq = requireSeq(row, where)
    if (seq > bestSeq) {
      bestSeq = seq
      best = row
    }
  }
  return best
}

export function readPipelinesByBranchAndStatuses(
  roots: Roots,
  args: { readonly branch: string; readonly includeStatuses: readonly string[] }
): readonly Row[] {
  if (args.includeStatuses.length === 0) return []
  return readPages(roots, {
    pageType: PIPELINE,
    where: [
      { key: BRANCH_KEY, is: args.branch },
      { key: STATUS_KEY, in: args.includeStatuses },
    ],
  })
}

export function readPipelinesByStatuses(
  roots: Roots,
  args: { readonly includeStatuses: readonly string[]; readonly pipelineSeqScope?: number }
): readonly Row[] {
  if (args.includeStatuses.length === 0) return []
  const rows = readPages(roots, {
    pageType: PIPELINE,
    where: [{ key: STATUS_KEY, in: args.includeStatuses }],
  })
  const scope = args.pipelineSeqScope
  if (scope === undefined) return rows
  return rows.filter((row) => requireSeq(row, "readPipelinesByStatuses") === scope)
}

export function readChildrenOfPipelineSeqs(
  roots: Roots,
  args: {
    readonly pageType: string
    readonly pipelineSeqs: readonly number[]
    readonly includeStatuses?: readonly string[]
  }
): readonly Row[] {
  if (args.pipelineSeqs.length === 0) return []
  const where: Test[] = [inSeqs(PIPELINE_SEQ_KEY, args.pipelineSeqs)]
  if (args.includeStatuses !== undefined) {
    if (args.includeStatuses.length === 0) return []
    where.push({ key: STATUS_KEY, in: args.includeStatuses })
  }
  return readPages(roots, { pageType: args.pageType, where })
}

export function readStepsOfWorkflowSeqs(
  roots: Roots,
  args: { readonly workflowSeqs: readonly number[]; readonly includeStatuses?: readonly string[] }
): readonly Row[] {
  if (args.workflowSeqs.length === 0) return []
  const where: Test[] = [inSeqs(WORKFLOW_SEQ_KEY, args.workflowSeqs)]
  if (args.includeStatuses !== undefined) {
    if (args.includeStatuses.length === 0) return []
    where.push({ key: STATUS_KEY, in: args.includeStatuses })
  }
  return readPages(roots, { pageType: STEP, where })
}

export function readPagesBySeqs(
  roots: Roots,
  args: { readonly pageType: string; readonly seqs: readonly number[] }
): readonly Row[] {
  if (args.seqs.length === 0) return []
  return readPages(roots, { pageType: args.pageType, where: [inSeqs(SEQ_KEY, args.seqs)] })
}

export function readPageBySeq(
  roots: Roots,
  args: { readonly pageType: string; readonly seq: number }
): Row | null {
  const rows = readPages(roots, {
    pageType: args.pageType,
    where: [isSeq(SEQ_KEY, args.seq)],
    limit: 2,
  })
  if (rows.length > 1) {
    throw new Error(
      `readPageBySeq(${args.pageType}, ${args.seq}): ${rows.length} pages share that seq, so one cannot be named`
    )
  }
  return rows[0] ?? null
}

export function readLatestPageMatching(
  roots: Roots,
  args: { readonly pageType: string; readonly where: readonly Test[] }
): Row | null {
  const rows = readPages(roots, {
    pageType: args.pageType,
    where: args.where,
    order: "desc",
    limit: 1,
  })
  return rows[0] ?? null
}
