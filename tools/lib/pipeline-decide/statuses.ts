import {
  TERMINAL_PIPELINE_STATUSES,
  TERMINAL_STEP_STATUSES,
  TERMINAL_WORKFLOW_STATUSES,
} from "../ci-worker-pure/ci-status-vocabulary.ts"

export const CANCELED = "canceled"

export const WORKER_PIPELINE_TERMINAL: ReadonlySet<string> = new Set<string>(
  TERMINAL_PIPELINE_STATUSES
)

export const WORKER_WORKFLOW_TERMINAL: ReadonlySet<string> = new Set<string>(
  TERMINAL_WORKFLOW_STATUSES
)

export const WORKER_STEP_TERMINAL: ReadonlySet<string> = new Set<string>(TERMINAL_STEP_STATUSES)
