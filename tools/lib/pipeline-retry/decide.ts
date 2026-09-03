import {
  ANSWERED_ELSEWHERE,
  BLOCKED,
  FAILED,
  OVERTAKEN,
  PASSED,
  PIPELINE_TERMINAL,
} from "@akasha/pipeline-sweep/pipeline-page-statuses"
import type { Pipeline, Step, Workflow } from "@akasha/pipeline-sweep/pipeline-row-entities"

export const CAPACITY_STARVED = "capacity-starved"

const RETRYABLE: ReadonlySet<string> = new Set([FAILED, BLOCKED])

export interface Plan {
  readonly kind: "plan"
  readonly workflows: readonly Workflow[]
  readonly steps: readonly Step[]
}

export interface Refusal {
  readonly kind: "refusal"
  readonly reason: string
}

export type Decision = Plan | Refusal

export interface Reading {
  readonly pipeline: Pipeline
  readonly workflows: readonly Workflow[]
  readonly stepsOf: (workflowSeq: string) => readonly Step[]
  readonly failureOf: (stepSeq: string) => string | null
  readonly branchTip: string | null
}

function refuse(reason: string): Refusal {
  return { kind: "refusal", reason }
}

function short(commit: string): string {
  return commit.substring(0, 9)
}

function whyNotRetriable(pipeline: Pipeline): string | null {
  const at = `pipeline ${pipeline.seq}`
  if (!PIPELINE_TERMINAL.has(pipeline.status)) {
    return `${at} is \`${pipeline.status}\` and still underway, so there is nothing to retry`
  }
  if (pipeline.status === ANSWERED_ELSEWHERE) {
    return `${at} was answered elsewhere: a later run already cured every workflow it failed`
  }
  if (pipeline.status === OVERTAKEN) {
    return `${at} was overtaken by a newer pipeline on the same branch, which is not retriable`
  }
  if (pipeline.status === PASSED) return `${at} passed, so there is nothing to retry`
  if (pipeline.status !== FAILED) {
    return `${at} is \`${pipeline.status}\`, and retry re-dispatches a failed pipeline only`
  }
  return null
}

function blockedDependents(
  seeds: readonly string[],
  workflows: readonly Workflow[]
): readonly Workflow[] {
  const reached = new Set(seeds)
  const found: Workflow[] = []
  let grew = true
  while (grew) {
    grew = false
    for (const one of workflows) {
      if (one.status !== BLOCKED || reached.has(one.slug)) continue
      if (!one.dependsOn.some((need) => reached.has(need))) continue
      reached.add(one.slug)
      found.push(one)
      grew = true
    }
  }
  return found
}

type Selection = { readonly kind: "selected"; readonly workflows: readonly Workflow[] } | Refusal

function selectionFor(reading: Reading, targetWorkflow: string | null): Selection {
  const { pipeline, workflows } = reading
  if (targetWorkflow === null) {
    const found = workflows.filter((one) => RETRYABLE.has(one.status))
    if (found.length === 0) {
      return refuse(`pipeline ${pipeline.seq} holds no failed or blocked workflow to retry`)
    }
    return { kind: "selected", workflows: found }
  }
  const named = workflows.find((one) => one.slug === targetWorkflow)
  if (named === undefined) {
    const held = workflows.map((one) => one.slug).join(", ")
    return refuse(
      `pipeline ${pipeline.seq} holds no workflow named \`${targetWorkflow}\`; it holds ${held}`
    )
  }
  if (named.status !== FAILED) {
    return refuse(`workflow \`${named.slug}\` is \`${named.status}\`, not failed`)
  }
  return { kind: "selected", workflows: [named, ...blockedDependents([named.slug], workflows)] }
}

function starvedIn(reading: Reading, steps: readonly Step[]): Step | null {
  for (const one of steps) {
    const said = reading.failureOf(one.seq)
    if (said !== null && said.trim().toLowerCase().startsWith(CAPACITY_STARVED)) return one
  }
  return null
}

export function decideRetry(reading: Reading, targetWorkflow: string | null): Decision {
  const { pipeline } = reading
  const notRetriable = whyNotRetriable(pipeline)
  if (notRetriable !== null) return refuse(notRetriable)

  if (reading.branchTip === null) {
    return refuse(
      `branch \`${pipeline.branch}\` has no tip to read, so nothing says whether pipeline ` +
        `${pipeline.seq} still stands at it`
    )
  }
  if (reading.branchTip !== pipeline.commit) {
    return refuse(
      `pipeline ${pipeline.seq} stands at ${short(pipeline.commit)} and \`${pipeline.branch}\` is ` +
        `now at ${short(reading.branchTip)}, so retrying would re-run and deploy a superseded commit`
    )
  }

  const selected = selectionFor(reading, targetWorkflow)
  if (selected.kind === "refusal") return selected

  const steps = selected.workflows
    .flatMap((one) => reading.stepsOf(one.seq))
    .filter((one) => RETRYABLE.has(one.status))

  const starved = starvedIn(reading, steps)
  if (starved !== null) {
    return refuse(
      `step ${starved.seq} \`${starved.title}\` failed \`${reading.failureOf(starved.seq)}\`, and a ` +
        "retry re-dispatches onto the node that starved it, so it cannot cure a capacity starve"
    )
  }

  return { kind: "plan", workflows: selected.workflows, steps }
}
