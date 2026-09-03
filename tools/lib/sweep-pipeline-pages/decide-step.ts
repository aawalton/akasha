import {
  ANSWERED_ELSEWHERE,
  ANSWERED_PRESERVE,
  BLOCKED,
  DISPATCHING,
  FAILED,
  LAUNCHING,
  OVERTAKEN,
  PASSED,
  PENDING,
  RUNNING,
  SKIPPED,
  STEP,
  STEP_TERMINAL,
} from "@akasha/pipeline-sweep/pipeline-page-statuses"
import type { Step, Workflow } from "@akasha/pipeline-sweep/pipeline-row-entities"
import type { ContainerReading } from "./cluster.ts"
import {
  allTerminal,
  blockerOf,
  dependenciesOf,
  whenConditionMet,
  workflowIsHealthy,
} from "./dispatch-guards.ts"
import { type Effect, transition } from "./effects.ts"

export const LAUNCH_TIMEOUT_MS = 900_000

export const ENQUEUE_TIMEOUT_MS = 1_800_000

export const CAPACITY_WAIT_TIMEOUT_MS = 2_700_000

export const MAX_LAUNCH_ATTEMPTS = 6

export const RELAUNCH_BASE_DELAY_MS = 30_000

export const RELAUNCH_MAX_DELAY_MS = 300_000

export const WHEN_UNMET = "when-condition-unmet"

export const LAUNCH_TIMED_OUT = "launch-timed-out"

export const ENQUEUE_TIMED_OUT = "enqueue-timed-out"

export const SIGKILL_UNATTRIBUTED =
  "SIGKILL (unattributed; possible unstamped OOM - check node dmesg / memory limit)"

const K8S_EXITED_NONZERO_NO_CAUSE = "Error"

export interface StepSurroundings {
  readonly workflow: Workflow
  readonly siblings: readonly Step[]
  readonly byTitle: ReadonlyMap<string, Step>
  readonly containers: ReadonlyMap<string, ContainerReading> | null
  readonly hasDefinition: (stepSeq: string) => boolean
  readonly now: number
}

function backoffMs(attempts: number): number {
  return Math.min(RELAUNCH_MAX_DELAY_MS, RELAUNCH_BASE_DELAY_MS * 2 ** (attempts - 1))
}

export function killReasonOf(container: ContainerReading): string | null {
  const terminated = container.stepTerminated
  if (terminated === null) return null
  if (terminated.reason === "OOMKilled") return "OOMKilled"
  if (container.reason === "Evicted") return "Evicted"
  if (container.deleted) return "ContainerDeleted"
  if (terminated.signal === 9 || terminated.exitCode === 137) return SIGKILL_UNATTRIBUTED
  if (terminated.signal === 15 || terminated.exitCode === 143) return "SIGTERM"
  if (terminated.reason === K8S_EXITED_NONZERO_NO_CAUSE) return null
  return terminated.reason
}

function containerOf(step: Step, held: StepSurroundings): ContainerReading | null {
  if (held.containers === null || step.containerName === null) return null
  return held.containers.get(step.containerName) ?? null
}

function decideDispatching(step: Step, now: number): readonly Effect[] {
  const deferredMs =
    step.dispatchWaitSince !== null && step.dispatchWaitSince <= now
      ? now - step.dispatchWaitSince
      : 0
  if (deferredMs >= CAPACITY_WAIT_TIMEOUT_MS) {
    return [
      transition(
        STEP,
        step.seq,
        DISPATCHING,
        FAILED,
        "step.dispatching-to-failed.capacity-starved",
        {
          "exit-code": 1,
          "failure-reason": `capacity-starved:${step.dispatchWaitNode ?? "unknown"}`,
        }
      ),
    ]
  }
  if (step.dispatchedAt === null || now - step.dispatchedAt - deferredMs >= ENQUEUE_TIMEOUT_MS) {
    return [
      transition(
        STEP,
        step.seq,
        DISPATCHING,
        FAILED,
        "step.dispatching-to-failed.enqueue-timeout",
        {
          "exit-code": 1,
          "failure-reason": ENQUEUE_TIMED_OUT,
        }
      ),
    ]
  }
  return []
}

function decideStalledLaunch(step: Step, now: number): readonly Effect[] {
  const refused = step.launchRefusedReason
  const timedOut =
    step.launchAttemptedAt !== null && now - step.launchAttemptedAt >= LAUNCH_TIMEOUT_MS
  if (refused === null && !timedOut) return []

  const why = refused === null ? LAUNCH_TIMED_OUT : `launch-refused:${refused}`
  const attempts = step.launchAttempts + 1

  if (step.launchAttempts < MAX_LAUNCH_ATTEMPTS) {
    return [
      transition(
        STEP,
        step.seq,
        LAUNCHING,
        PENDING,
        `step.launching-to-pending.${refused === null ? "launch-timeout" : "launch-refused"}`,
        {
          "launch-attempts": attempts,
          "relaunch-not-before": new Date(now + backoffMs(attempts)).toISOString(),
          "launch-refused-reason": null,
          "container-launch-attempted-at": null,
          "container-name": null,
        }
      ),
    ]
  }

  return [
    transition(
      STEP,
      step.seq,
      LAUNCHING,
      FAILED,
      `step.launching-to-failed.${refused === null ? "launch-timeout" : "launch-refused"}`,
      {
        "exit-code": 1,
        "failure-reason": why,
      }
    ),
  ]
}

function decidePending(step: Step, held: StepSurroundings): readonly Effect[] {
  const dependencies = dependenciesOf(step, held.byTitle)
  const settled = allTerminal(dependencies)
  const blocker = blockerOf(step, held.byTitle)
  const met = step.alwaysRuns || whenConditionMet(step, dependencies)

  if (
    settled &&
    blocker === null &&
    met &&
    workflowIsHealthy(held.workflow) &&
    held.now >= (step.relaunchNotBefore ?? 0) &&
    held.hasDefinition(step.seq)
  ) {
    return [
      transition(
        STEP,
        step.seq,
        PENDING,
        DISPATCHING,
        "step.pending-to-dispatching.guards-passed",
        {
          "dispatched-at": new Date(held.now).toISOString(),
          "dispatch-wait-reason": null,
          "dispatch-wait-node": null,
          "dispatch-wait-since": null,
        }
      ),
    ]
  }

  if (blocker !== null) {
    return [
      transition(STEP, step.seq, PENDING, BLOCKED, "step.pending-to-blocked.dependency-failed", {
        "blocked-by": blocker,
      }),
    ]
  }

  if (!step.alwaysRuns && settled && !whenConditionMet(step, dependencies)) {
    return [
      transition(STEP, step.seq, PENDING, SKIPPED, "step.pending-to-skipped.when-unmet", {
        "skip-reason": WHEN_UNMET,
      }),
    ]
  }

  return []
}

export function decideStep(step: Step, held: StepSurroundings): readonly Effect[] {
  const workflow = held.workflow

  if (workflow.status === ANSWERED_ELSEWHERE) {
    if (!ANSWERED_PRESERVE.has(step.status) && step.status !== ANSWERED_ELSEWHERE) {
      return [
        transition(
          STEP,
          step.seq,
          step.status,
          ANSWERED_ELSEWHERE,
          "step.any-to-answered-elsewhere.workflow-answered"
        ),
      ]
    }
  }

  if (STEP_TERMINAL.has(step.status)) return []

  if (workflow.status === OVERTAKEN) {
    return [
      transition(
        STEP,
        step.seq,
        step.status,
        OVERTAKEN,
        "step.any-to-overtaken.workflow-overtaken"
      ),
    ]
  }
  if (workflow.status === BLOCKED) {
    return [
      transition(STEP, step.seq, step.status, BLOCKED, "step.any-to-blocked.workflow-blocked"),
    ]
  }

  if (step.status === PENDING) return decidePending(step, held)

  if (step.status === DISPATCHING) return decideDispatching(step, held.now)

  if (step.status === LAUNCHING) {
    const container = containerOf(step, held)
    if (
      container !== null &&
      (container.stepStartedAt !== null || container.stepTerminated !== null)
    ) {
      return [
        transition(
          STEP,
          step.seq,
          LAUNCHING,
          RUNNING,
          "step.launching-to-running.container-started",
          {
            "started-at": container.stepStartedAt ?? new Date(held.now).toISOString(),
          }
        ),
      ]
    }
    return decideStalledLaunch(step, held.now)
  }

  if (step.status === RUNNING) {
    const container = containerOf(step, held)
    const terminated = container?.stepTerminated ?? null
    if (container === null || terminated === null) return []
    if (terminated.exitCode === 0) {
      return [
        transition(STEP, step.seq, RUNNING, PASSED, "step.running-to-passed.container-exited", {
          "exit-code": 0,
        }),
      ]
    }
    const why = killReasonOf(container)
    return [
      transition(STEP, step.seq, RUNNING, FAILED, "step.running-to-failed.container-exited", {
        "exit-code": terminated.exitCode,
        ...(why === null ? {} : { "failure-reason": why }),
      }),
    ]
  }

  return []
}
