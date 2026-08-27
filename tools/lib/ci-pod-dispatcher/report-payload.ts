export type Iso8601Timestamp = string & { __brand: "Iso8601Timestamp" }

export function Iso8601Timestamp(value: string): Iso8601Timestamp {
  return value as Iso8601Timestamp
}

export function isoEpoch(): Iso8601Timestamp {
  return Iso8601Timestamp(new Date(0).toISOString())
}

export const STEP_PAGE_TYPE = "step"

export const STEP_CALLBACK_WRITER = "ci-step-pod"

export const CALLBACK_WON_MARKER = '"outcome":"won"'

export type StepClaimedFrom = "launching" | "dispatching"

export type StepTerminalStatus = "passed" | "failed"

export interface PagePatchIfRequest {
  writer: string
  values: Record<string, unknown>
  "if-key": string
  "if-value": string
}

export function patchIfPath(pageType: string, name: string): string {
  return `/patch-if/${pageType}/${encodeURIComponent(name)}`
}

export function stepPatchIfPath(stepPageName: string): string {
  return patchIfPath(STEP_PAGE_TYPE, stepPageName)
}

export interface StepStartedReportArgs {
  podName: string
  startedAt: Iso8601Timestamp
}

function startedFrom(from: StepClaimedFrom, args: StepStartedReportArgs): PagePatchIfRequest {
  return {
    writer: STEP_CALLBACK_WRITER,
    values: {
      status: "running",
      "container-name": args.podName,
      "started-at": args.startedAt,
    },
    "if-key": "status",
    "if-value": from,
  }
}

export function buildStepStartedReport(args: StepStartedReportArgs): PagePatchIfRequest {
  return startedFrom("launching", args)
}

export function buildStepStartedReportFallback(args: StepStartedReportArgs): PagePatchIfRequest {
  return startedFrom("dispatching", args)
}

export interface StepCompleteReportArgs {
  status: StepTerminalStatus
  exitCode: number
  completedAt: Iso8601Timestamp
}

export function buildStepCompleteReport(args: StepCompleteReportArgs): PagePatchIfRequest {
  return {
    writer: STEP_CALLBACK_WRITER,
    values: {
      status: args.status,
      "exit-code": args.exitCode,
      "completed-at": args.completedAt,
    },
    "if-key": "status",
    "if-value": "running",
  }
}
