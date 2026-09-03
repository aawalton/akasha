import type { Row } from "@akasha/pages-system/page-derive-shape"
import { listOf, textOf } from "@akasha/pages-system/page-query-values"
import type { Values } from "../page-file-values.ts"
import { PENDING } from "./statuses.ts"

export interface Pipeline {
  readonly seq: string
  readonly status: string
  readonly branch: string
  readonly commit: string
  readonly overtakenBySeq: string | null
}

export interface Workflow {
  readonly seq: string
  readonly pipelineSeq: string
  readonly status: string
  readonly slug: string
  readonly dependsOn: readonly string[]
  readonly alwaysRuns: boolean
  readonly inputsHash: string | null
  readonly deployedCommit: string | null
  readonly deployedInputsHash: string | null
}

export interface Step {
  readonly seq: string
  readonly workflowSeq: string
  readonly status: string
  readonly title: string
  readonly dependsOn: readonly string[]
  readonly whenConditions: readonly string[]
  readonly alwaysRuns: boolean
  readonly containerName: string | null
  readonly launchAttempts: number
  readonly launchRefusedReason: string | null
  readonly launchAttemptedAt: number | null
  readonly relaunchNotBefore: number | null
  readonly dispatchedAt: number | null
  readonly dispatchWaitSince: number | null
  readonly dispatchWaitNode: string | null
}

function said(values: Values, key: string): string | null {
  const one = textOf(values, key)
  return one === null || one.trim() === "" ? null : one
}

function flag(values: Values, key: string): boolean {
  return said(values, key) === "true"
}

function count(values: Values, key: string): number {
  const one = said(values, key)
  if (one === null) return 0
  const held = Number(one)
  return Number.isFinite(held) ? held : 0
}

export function momentOf(values: Values, key: string): number | null {
  const one = said(values, key)
  if (one === null) return null
  const ms = Date.parse(one)
  return Number.isFinite(ms) ? ms : null
}

function ordinal(values: Values, key: string): string | null {
  const one = said(values, key)
  return one !== null && /^\d+$/.test(one) ? one : null
}

export function pipelineIn(row: Row): Pipeline | null {
  const seq = ordinal(row.values, "seq")
  if (seq === null) return null
  return {
    seq,
    status: said(row.values, "status") ?? PENDING,
    branch: said(row.values, "branch") ?? "",
    commit: said(row.values, "commit") ?? "",
    overtakenBySeq: ordinal(row.values, "overtaken-by-seq"),
  }
}

export function workflowIn(row: Row): Workflow | null {
  const seq = ordinal(row.values, "seq")
  const pipelineSeq = ordinal(row.values, "pipeline-seq")
  if (seq === null || pipelineSeq === null) return null
  return {
    seq,
    pipelineSeq,
    status: said(row.values, "status") ?? PENDING,
    slug: said(row.values, "slug") ?? seq,
    dependsOn: listOf(row.values, "depends-on"),
    alwaysRuns: flag(row.values, "always-runs"),
    inputsHash: said(row.values, "inputs-hash"),
    deployedCommit: said(row.values, "deployed-commit"),
    deployedInputsHash: said(row.values, "deployed-inputs-hash"),
  }
}

export function stepIn(row: Row): Step | null {
  const seq = ordinal(row.values, "seq")
  const workflowSeq = ordinal(row.values, "workflow-seq")
  if (seq === null || workflowSeq === null) return null
  return {
    seq,
    workflowSeq,
    status: said(row.values, "status") ?? PENDING,
    title: said(row.values, "title") ?? seq,
    dependsOn: listOf(row.values, "depends-on"),
    whenConditions: listOf(row.values, "when-conditions"),
    alwaysRuns: flag(row.values, "always-runs"),
    containerName: said(row.values, "container-name"),
    launchAttempts: count(row.values, "launch-attempts"),
    launchRefusedReason: said(row.values, "launch-refused-reason"),
    launchAttemptedAt: momentOf(row.values, "container-launch-attempted-at"),
    relaunchNotBefore: momentOf(row.values, "relaunch-not-before"),
    dispatchedAt: momentOf(row.values, "dispatched-at"),
    dispatchWaitSince: momentOf(row.values, "dispatch-wait-since"),
    dispatchWaitNode: said(row.values, "dispatch-wait-node"),
  }
}
