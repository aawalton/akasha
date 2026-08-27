export const NON_TERMINAL_PIPELINE_STATUSES: readonly string[] = ["pending", "dispatching", "running"]

export const NON_TERMINAL_WORKFLOW_STATUSES: readonly string[] = [
  "pending",
  "dispatching",
  "running",
]

export const NON_TERMINAL_STEP_STATUSES: readonly string[] = [
  "pending",
  "dispatching",
  "launching",
  "running",
]

export const FAILED = "failed"

export const PASSED = "passed"

export const ANSWERED_ELSEWHERE = "answered-elsewhere"

export const CASCADABLE_STATUSES: ReadonlySet<string> = new Set([FAILED, "blocked"])
