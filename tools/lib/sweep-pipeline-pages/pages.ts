import { readUncommitted } from "../../../page/uncommitted/uncommitted.ts"
import { load, UNREACHED } from "../page-query.ts"
import { type Row } from "../page-derive-shape.ts"
import { whereFor } from "../page-write-where.ts"
import type { Roots } from "../../../page/page"
import { type Pipeline, pipelineIn, type Step, stepIn, type Workflow, workflowIn } from "./entities.ts"
import { PIPELINE, STEP, WORKFLOW } from "./statuses.ts"

export interface Snapshot {
  readonly pipelines: readonly Pipeline[]
  readonly workflows: readonly Workflow[]
  readonly steps: readonly Step[]
}

function rowsOf(roots: Roots, pageType: string): Iterable<Row> {
  const found = load(roots, pageType)
  if (found === null) {
    throw new Error(`\`${pageType}\` ${UNREACHED}, so the sweep has nothing to read`)
  }
  return found
}

function held<T>(rows: Iterable<Row>, of: (row: Row) => T | null): readonly T[] {
  const out: T[] = []
  for (const row of rows) {
    const one = of(row)
    if (one !== null) out.push(one)
  }
  return out
}

export function readSnapshot(roots: Roots): Snapshot {
  return {
    pipelines: held(rowsOf(roots, PIPELINE), pipelineIn),
    workflows: held(rowsOf(roots, WORKFLOW), workflowIn),
    steps: held(rowsOf(roots, STEP), stepIn),
  }
}

function statesSomething(one: unknown): boolean {
  if (one === null || typeof one !== "object" || Array.isArray(one)) return false
  return Object.keys(one as Record<string, unknown>).length > 0
}

export function definitionReader(roots: Roots): (stepSeq: string) => boolean {
  const seen = new Map<string, boolean>()
  return (stepSeq) => {
    const known = seen.get(stepSeq)
    if (known !== undefined) return known
    const at = whereFor(roots, STEP, stepSeq)
    const stands = at === null ? false : statesSomething(readUncommitted(at.path)?.definition)
    seen.set(stepSeq, stands)
    return stands
  }
}

export interface Kin {
  readonly pipelineBySeq: ReadonlyMap<string, Pipeline>
  readonly workflowBySeq: ReadonlyMap<string, Workflow>
  readonly pipelinesByBranch: ReadonlyMap<string, readonly Pipeline[]>
  readonly workflowsByPipeline: ReadonlyMap<string, readonly Workflow[]>
  readonly stepsByWorkflow: ReadonlyMap<string, readonly Step[]>
}

function grouped<T>(items: readonly T[], by: (one: T) => string): ReadonlyMap<string, readonly T[]> {
  const out = new Map<string, T[]>()
  for (const one of items) {
    const key = by(one)
    const list = out.get(key) ?? []
    list.push(one)
    out.set(key, list)
  }
  return out
}

export function kinOf(snapshot: Snapshot): Kin {
  const pipelineBySeq = new Map<string, Pipeline>()
  for (const one of snapshot.pipelines) pipelineBySeq.set(one.seq, one)
  const workflowBySeq = new Map<string, Workflow>()
  for (const one of snapshot.workflows) workflowBySeq.set(one.seq, one)
  return {
    pipelineBySeq,
    workflowBySeq,
    pipelinesByBranch: grouped(snapshot.pipelines, (one) => one.branch),
    workflowsByPipeline: grouped(snapshot.workflows, (one) => one.pipelineSeq),
    stepsByWorkflow: grouped(snapshot.steps, (one) => one.workflowSeq),
  }
}
