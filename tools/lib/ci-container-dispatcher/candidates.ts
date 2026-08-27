import { readUncommitted } from "../../../page/uncommitted/uncommitted.ts"
import { answer, type Values } from "../page-query.ts"
import { listOf, textOf } from "../page-query-values.ts"
import { whereFor } from "../page-write-where.ts"
import type { Roots } from "../../../page/page"
import { parseCpuMillis, parseMemoryBytes } from "./capacity.ts"
import { onMainBranch } from "./select-next.ts"
import { type Candidate, DEFAULT_REQUESTS, isRecord, type Requests } from "./types.ts"

export const DISPATCHING = "dispatching"

function momentOf(raw: string | null): number | null {
  if (raw === null) return null
  const ms = Date.parse(raw)
  return Number.isFinite(ms) ? ms : null
}

export function definitionOf(roots: Roots, stepSeq: string): Readonly<Record<string, unknown>> {
  const at = whereFor(roots, "step", stepSeq)
  if (at === null) return {}
  const held = readUncommitted(at.path)?.definition
  return isRecord(held) ? held : {}
}

export function requestsOf(definition: Readonly<Record<string, unknown>>): Requests {
  const requests = isRecord(definition.resources) ? definition.resources.requests : undefined
  if (!isRecord(requests)) return DEFAULT_REQUESTS
  const cpu = typeof requests.cpu === "string" ? parseCpuMillis(requests.cpu) : 0
  const memory = typeof requests.memory === "string" ? parseMemoryBytes(requests.memory) : 0
  return {
    cpuMillis: cpu > 0 ? cpu : DEFAULT_REQUESTS.cpuMillis,
    memoryBytes: memory > 0 ? memory : DEFAULT_REQUESTS.memoryBytes,
  }
}

function largest(a: Requests, b: Requests): Requests {
  return {
    cpuMillis: Math.max(a.cpuMillis, b.cpuMillis),
    memoryBytes: Math.max(a.memoryBytes, b.memoryBytes),
  }
}

function byKey(rows: readonly { readonly values: Values }[], key: string): Map<string, Values> {
  const held = new Map<string, Values>()
  for (const row of rows) {
    const named = textOf(row.values, key)
    if (named !== null && !held.has(named)) held.set(named, row.values)
  }
  return held
}

function unique(said: readonly (string | null)[]): readonly string[] {
  return [...new Set(said.filter((one): one is string => one !== null))]
}

async function pagesBySeq(
  roots: Roots,
  pageType: string,
  seqs: readonly string[]
): Promise<Map<string, Values>> {
  if (seqs.length === 0) return new Map()
  const found = answer(roots, { pageType, where: [{ key: "seq", in: seqs }] })
  return found === null ? new Map() : byKey(found.rows, "seq")
}

async function pipelineMaxRequests(
  roots: Roots,
  unboundPipelineSeqs: readonly string[]
): Promise<Map<string, Requests>> {
  const most = new Map<string, Requests>()
  if (unboundPipelineSeqs.length === 0) return most
  const found = answer(roots, {
    pageType: "step",
    where: [{ key: "pipeline-seq", in: unboundPipelineSeqs }],
    keys: ["seq", "pipeline-seq"],
  })
  if (found === null) return most
  for (const row of found.rows) {
    const stepSeq = textOf(row.values, "seq")
    const pipelineSeq = textOf(row.values, "pipeline-seq")
    if (stepSeq === null || pipelineSeq === null) continue
    const asked = requestsOf(definitionOf(roots, stepSeq))
    const held = most.get(pipelineSeq)
    most.set(pipelineSeq, held === undefined ? asked : largest(held, asked))
  }
  return most
}

export function scanDispatchingSteps(roots: Roots, limit: number): readonly Values[] {
  const found = answer(roots, {
    pageType: "step",
    where: [{ key: "status", is: DISPATCHING }],
    sortBy: "seq",
    limit,
  })
  return found === null ? [] : found.rows.map((row) => row.values)
}

export async function enrich(
  roots: Roots,
  steps: readonly Values[],
  skipped: (line: string) => void
): Promise<readonly Candidate[]> {
  if (steps.length === 0) return []

  const workflows = await pagesBySeq(
    roots,
    "workflow",
    unique(steps.map((one) => textOf(one, "workflow-seq")))
  )
  const pipelines = await pagesBySeq(
    roots,
    "pipeline",
    unique(steps.map((one) => textOf(one, "pipeline-seq")))
  )

  const unbound = unique(
    [...pipelines.values()]
      .filter(
        (one) =>
          !onMainBranch(textOf(one, "branch") ?? "") && textOf(one, "node") === null
      )
      .map((one) => textOf(one, "seq"))
  )
  const most = await pipelineMaxRequests(roots, unbound)

  const out: Candidate[] = []
  for (const step of steps) {
    const stepSeq = textOf(step, "seq")
    if (stepSeq === null) {
      skipped("a dispatching step names no seq, so nothing addresses its page")
      continue
    }
    const workflowSeq = textOf(step, "workflow-seq")
    const pipelineSeq = textOf(step, "pipeline-seq")
    if (workflowSeq === null || pipelineSeq === null) {
      skipped(`step ${stepSeq} names no workflow-seq or no pipeline-seq`)
      continue
    }
    const workflow = workflows.get(workflowSeq)
    const pipeline = pipelines.get(pipelineSeq)
    if (workflow === undefined || pipeline === undefined) {
      skipped(`step ${stepSeq} names workflow ${workflowSeq} and pipeline ${pipelineSeq}, and one of them is not there`)
      continue
    }
    const workflowStatus = textOf(workflow, "status")
    const pipelineStatus = textOf(pipeline, "status")
    if (workflowStatus === null || pipelineStatus === null) {
      skipped(`step ${stepSeq} sits under an ancestor with no status`)
      continue
    }
    const stepName = textOf(step, "title")
    if (stepName === null) {
      skipped(`step ${stepSeq} has no title, and its title is the name its container carries`)
      continue
    }
    const definition = definitionOf(roots, stepSeq)
    const requests = requestsOf(definition)
    out.push({
      stepSeq,
      stepName,
      dependsOn: listOf(step, "depends-on"),
      workflowSeq,
      workflowSlug: textOf(workflow, "slug") ?? "unknown",
      workflowKind: textOf(workflow, "kind") ?? "unknown",
      workflowStatus,
      pipelineSeq,
      pipelineStatus,
      pipelineBranch: textOf(pipeline, "branch") ?? "",
      pipelineCommit: textOf(pipeline, "commit") ?? "",
      pipelineInstructionsCommit: textOf(pipeline, "instructions-commit") ?? "",
      inputsHash: textOf(workflow, "inputs-hash"),
      assignedNode: textOf(pipeline, "node"),
      definition,
      requests,
      pipelineMaxRequests: most.get(pipelineSeq) ?? requests,
      dispatchWaitSince: momentOf(textOf(step, "dispatch-wait-since")),
      neverFitSince: momentOf(textOf(step, "never-fit-since")),
    })
  }
  return out
}
