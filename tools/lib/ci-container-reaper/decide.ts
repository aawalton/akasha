export const TERMINAL_STEP_STATUSES: ReadonlySet<string> = new Set([
  "passed",
  "failed",
  "blocked",
  "skipped",
  "answered-elsewhere",
  "overtaken",
])

export const TERMINAL_PIPELINE_STATUSES: ReadonlySet<string> = new Set([
  "passed",
  "failed",
  "answered-elsewhere",
  "overtaken",
])

export interface StepTerminated {
  readonly exitCode: number
  readonly finishedAt: string | null
  readonly reason: string | null
  readonly signal: number | null
}

const CONTAINER_NAME_SEQ = /^pe-(\d+)-[^-]/

export function pipelineSeqFromContainerName(containerName: string): string | null {
  const found = CONTAINER_NAME_SEQ.exec(containerName)
  const digits = found?.[1]
  if (digits === undefined) return null
  const seq = Number.parseInt(digits, 10)
  return Number.isSafeInteger(seq) ? String(seq) : null
}

export type ReapReason =
  | "step-terminal"
  | "step-non-terminal"
  | "pipeline-terminal-orphan"
  | "orphan-pipeline-running"
  | "no-pipeline"
  | "no-step-out-of-band"

export interface ReapDecision {
  readonly reap: boolean
  readonly reason: ReapReason
  readonly containerName: string
}

export interface ReapInput {
  readonly containerName: string
  readonly stepStatus: string | null
  readonly pipelineStatus: string | null
}

export function shouldReapContainer(input: ReapInput): ReapDecision {
  const { containerName, stepStatus, pipelineStatus } = input
  if (stepStatus !== null) {
    const reap = TERMINAL_STEP_STATUSES.has(stepStatus)
    return { reap, reason: reap ? "step-terminal" : "step-non-terminal", containerName }
  }
  if (pipelineSeqFromContainerName(containerName) === null) {
    return { reap: false, reason: "no-step-out-of-band", containerName }
  }
  if (pipelineStatus === null) return { reap: false, reason: "no-pipeline", containerName }
  if (TERMINAL_PIPELINE_STATUSES.has(pipelineStatus)) {
    return { reap: true, reason: "pipeline-terminal-orphan", containerName }
  }
  return { reap: false, reason: "orphan-pipeline-running", containerName }
}

export type LaunchRefusalDecision =
  | { readonly mark: true; readonly reason: string }
  | { readonly mark: false }

export interface LaunchRefusalInput {
  readonly stepStatus: string | null
  readonly phase: string
  readonly containerReason: string | null
}

export function isLaunchRefusedReason(reason: string | null): boolean {
  return (reason ?? "").startsWith("OutOf")
}

export function decideLaunchRefusal(input: LaunchRefusalInput): LaunchRefusalDecision {
  const { stepStatus, phase, containerReason } = input
  if (stepStatus !== "launching" || phase !== "Failed") return { mark: false }
  if (containerReason === null || !isLaunchRefusedReason(containerReason)) return { mark: false }
  return { mark: true, reason: containerReason }
}
