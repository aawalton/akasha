import { FAILED, OVERTAKEN, PASSED } from "../sweep-pipeline-pages/statuses.ts"
import { CANCELED, WORKER_PIPELINE_TERMINAL, WORKER_WORKFLOW_TERMINAL } from "./statuses.ts"

export const TERMINAL_WITHOUT_LINK_GRACE_MS = 10_000

const SUCCESS = "success"

function normalized(status: string): string {
  return status === SUCCESS ? PASSED : status
}

export interface WaitWorkflow {
  readonly name: string
  readonly status: string
}

export interface WaitPipeline {
  readonly seq: number
  readonly status: string
  readonly supersededBy?: number
  readonly commitSha?: string
}

export interface WaitSnapshot {
  readonly pipeline: WaitPipeline | null
  readonly workflows: readonly WaitWorkflow[]
}

export interface PollResult {
  readonly passed: boolean
  readonly seq: number
  readonly status: string
  readonly commitSha: string | null
  readonly superseded_from?: number
  readonly workflows: readonly WaitWorkflow[]
}

export interface WaitState {
  readonly lastEffectiveSeq: number | undefined
  readonly supersededFrom: number | undefined
  readonly terminalWithoutLinkFirstSeenAt: number | null
  readonly startTime: number
}

export type WaitDecision =
  | { readonly action: "ignore" }
  | { readonly action: "wait"; readonly state: WaitState }
  | { readonly action: "followSupersession"; readonly seq: number; readonly state: WaitState }
  | { readonly action: "resolve"; readonly result: PollResult }

export function initialWaitState(now: number): WaitState {
  return {
    lastEffectiveSeq: undefined,
    supersededFrom: undefined,
    terminalWithoutLinkFirstSeenAt: null,
    startTime: now,
  }
}

function resultOf(
  pipeline: WaitPipeline,
  status: string,
  passed: boolean,
  workflows: readonly WaitWorkflow[],
  supersededFrom: number | undefined
): PollResult {
  return {
    passed,
    seq: pipeline.seq,
    status,
    commitSha: pipeline.commitSha ?? null,
    ...(supersededFrom === undefined ? {} : { superseded_from: supersededFrom }),
    workflows: workflows.map((one) => ({ name: one.name, status: normalized(one.status) })),
  }
}

export function resolveTerminalFromSnapshot(
  snapshot: WaitSnapshot,
  supersededFrom: number | undefined,
  expectedWorkflows: readonly string[] | undefined
): PollResult | null {
  const pipeline = snapshot.pipeline
  if (pipeline === null) return null
  const status = normalized(pipeline.status)
  const wholePipeline = WORKER_PIPELINE_TERMINAL.has(status)
    ? resultOf(pipeline, status, status === PASSED, snapshot.workflows, supersededFrom)
    : null

  if (expectedWorkflows === undefined || expectedWorkflows.length === 0) return wholePipeline

  const matched = snapshot.workflows.filter((one) => expectedWorkflows.includes(one.name))
  if (matched.length !== expectedWorkflows.length) return wholePipeline
  if (!matched.every((one) => WORKER_WORKFLOW_TERMINAL.has(normalized(one.status)))) return null

  const allPassed = matched.every((one) => normalized(one.status) === PASSED)
  return resultOf(pipeline, allPassed ? PASSED : FAILED, allPassed, matched, supersededFrom)
}

export function decideFromSnapshot(
  snapshot: WaitSnapshot,
  state: WaitState,
  now: number,
  expectedWorkflows: readonly string[] | undefined
): WaitDecision {
  const pipeline = snapshot.pipeline
  if (pipeline === null) return { action: "ignore" }

  const moved = state.lastEffectiveSeq !== undefined && pipeline.seq !== state.lastEffectiveSeq
  const carried: WaitState = {
    ...state,
    startTime: moved ? now : state.startTime,
    lastEffectiveSeq: pipeline.seq,
  }

  const status = normalized(pipeline.status)
  const byReplacement = status === CANCELED || status === OVERTAKEN

  if (byReplacement && pipeline.supersededBy !== undefined) {
    return {
      action: "followSupersession",
      seq: pipeline.supersededBy,
      state: {
        ...carried,
        supersededFrom: carried.supersededFrom ?? pipeline.seq,
        terminalWithoutLinkFirstSeenAt: null,
      },
    }
  }

  if (byReplacement) {
    const firstSeenAt = carried.terminalWithoutLinkFirstSeenAt
    if (firstSeenAt === null) {
      return { action: "wait", state: { ...carried, terminalWithoutLinkFirstSeenAt: now } }
    }
    if (now - firstSeenAt < TERMINAL_WITHOUT_LINK_GRACE_MS) {
      return { action: "wait", state: carried }
    }
  }

  const held: WaitState = byReplacement
    ? carried
    : { ...carried, terminalWithoutLinkFirstSeenAt: null }
  const result = resolveTerminalFromSnapshot(snapshot, held.supersededFrom, expectedWorkflows)
  return result === null ? { action: "wait", state: held } : { action: "resolve", result }
}
