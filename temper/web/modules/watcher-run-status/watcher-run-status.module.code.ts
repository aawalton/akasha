import type { ReportedAt } from "akasha/temper/player/progress/temper-watcher-enrolment/properties/reported-at.instant-property.types.ts"
import type { WatcherOperationState } from "akasha/temper/player/progress/temper-watcher-enrolment/properties/watcher-operations/properties/watcher-operation-state.select-property.types.ts"
import type { WatcherOperationsRow } from "akasha/temper/player/progress/temper-watcher-enrolment/properties/watcher-operations/watcher-operations.page-property-entry.types.ts"

type WatcherRunOperationState = WatcherOperationState

export type WatcherRunOperation = {
  name: string
  state: WatcherRunOperationState
  ranAt: string
  detail: string | null
}

export type ReportedRun = {
  readonly reportedAt?: ReportedAt
  readonly operations?: readonly WatcherOperationsRow[]
}

type WatcherRunInput = {
  reportedAt: string | null
  operations: readonly WatcherRunOperation[]
}

type WatcherRunVerdict =
  | "never-reported"
  | "nothing-readable"
  | "files-missing"
  | "parse-failing"
  | "upload-failing"
  | "working"

export type WatcherRunSummary = WatcherRunInput & {
  verdict: WatcherRunVerdict
  decidingOperations: readonly WatcherRunOperation[]
}

export function readReportedOperations(report: ReportedRun): WatcherRunInput {
  return {
    reportedAt: report.reportedAt ?? null,
    operations: (report.operations ?? []).map((one) => ({
      name: one.name,
      state: one.state,
      ranAt: one.ranAt,
      detail: one.detail ?? null,
    })),
  }
}

function withState(
  input: WatcherRunInput,
  state: WatcherRunOperationState
): readonly WatcherRunOperation[] {
  return input.operations.filter((op) => op.state === state)
}

export function deriveWatcherRunVerdict(input: WatcherRunInput): WatcherRunVerdict {
  if (input.operations.length === 0) return "never-reported"
  if (withState(input, "file_not_found").length > 0) return "files-missing"
  if (withState(input, "parse_failed").length > 0) return "parse-failing"
  if (withState(input, "upload_failed").length > 0) return "upload-failing"
  if (withState(input, "synced").length > 0) return "working"
  return "nothing-readable"
}

const DECIDING_STATE: Record<WatcherRunVerdict, WatcherRunOperationState | null> = {
  "never-reported": null,
  "nothing-readable": null,
  "files-missing": "file_not_found",
  "parse-failing": "parse_failed",
  "upload-failing": "upload_failed",
  working: "synced",
}

export function summarizeWatcherRun(input: WatcherRunInput): WatcherRunSummary {
  const verdict = deriveWatcherRunVerdict(input)
  const state = DECIDING_STATE[verdict]
  return {
    ...input,
    verdict,
    decidingOperations: state === null ? [] : withState(input, state),
  }
}
