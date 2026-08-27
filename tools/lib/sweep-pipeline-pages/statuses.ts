export const PIPELINE = "pipeline"

export const WORKFLOW = "workflow"

export const STEP = "step"

export const PENDING = "pending"

export const DISPATCHING = "dispatching"

export const LAUNCHING = "launching"

export const RUNNING = "running"

export const PASSED = "passed"

export const FAILED = "failed"

export const BLOCKED = "blocked"

export const SKIPPED = "skipped"

export const ANSWERED_ELSEWHERE = "answered-elsewhere"

export const OVERTAKEN = "overtaken"

export const PIPELINE_TERMINAL: ReadonlySet<string> = new Set([
  PASSED,
  FAILED,
  ANSWERED_ELSEWHERE,
  OVERTAKEN,
])

export const WORKFLOW_TERMINAL: ReadonlySet<string> = new Set([
  PASSED,
  FAILED,
  BLOCKED,
  SKIPPED,
  ANSWERED_ELSEWHERE,
  OVERTAKEN,
])

export const STEP_TERMINAL: ReadonlySet<string> = new Set([
  PASSED,
  FAILED,
  BLOCKED,
  SKIPPED,
  ANSWERED_ELSEWHERE,
  OVERTAKEN,
])

export const WORKFLOW_POSITIVE: ReadonlySet<string> = new Set([PASSED, SKIPPED])

export const WORKFLOW_NEGATIVE: ReadonlySet<string> = new Set([FAILED, BLOCKED, ANSWERED_ELSEWHERE])

export const STEP_NEGATIVE: ReadonlySet<string> = new Set([FAILED, BLOCKED, ANSWERED_ELSEWHERE])

export const ANSWERED_PRESERVE: ReadonlySet<string> = new Set([PASSED, SKIPPED, OVERTAKEN])

export const UNDERWAY: ReadonlySet<string> = new Set([DISPATCHING, RUNNING])

export const MAIN_BRANCH = "main"

export function overtakenByNewerOnBranch(branch: string, predecessorStatus: string): boolean {
  if (PIPELINE_TERMINAL.has(predecessorStatus)) return false
  if (branch !== MAIN_BRANCH) return true
  return predecessorStatus === PENDING
}
