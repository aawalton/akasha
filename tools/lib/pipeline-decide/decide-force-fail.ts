import { FAILED, LAUNCHING, RUNNING, STEP } from "../sweep-pipeline-pages/statuses.ts"
import { WORKER_STEP_TERMINAL } from "./statuses.ts"

export interface ResolvedStep {
  readonly id: string
  readonly status: string
  readonly exitCode: number | null
}

export interface ForceFailOptions {
  readonly exitCode: number
  readonly failureReason: string
  readonly completedAt: string
}

export interface StepTerminalPatch {
  readonly pageTypeSlug: typeof STEP
  readonly id: string
  readonly ifStatus: typeof RUNNING | typeof LAUNCHING
  readonly set: {
    readonly status: typeof FAILED
    readonly exitCode: number
    readonly failureReason: string
    readonly completedAt: string
  }
}

export type ForceFailDecision =
  | { readonly kind: "patch"; readonly patch: StepTerminalPatch }
  | { readonly kind: "already-terminal"; readonly status: string }
  | { readonly kind: "refuse"; readonly reason: string }

const FORCIBLE: ReadonlySet<string> = new Set([RUNNING, LAUNCHING])

export function decideForceFail(step: ResolvedStep, opts: ForceFailOptions): ForceFailDecision {
  if (WORKER_STEP_TERMINAL.has(step.status)) {
    return { kind: "already-terminal", status: step.status }
  }
  if (!FORCIBLE.has(step.status)) {
    return {
      kind: "refuse",
      reason:
        `step ${step.id} is \`${step.status}\`, neither \`${RUNNING}\` nor \`${LAUNCHING}\`, and ` +
        "force-fail forces a wedged running or launching step terminal and nothing else",
    }
  }
  if (step.exitCode !== null) {
    return {
      kind: "refuse",
      reason:
        `step ${step.id} is \`${step.status}\` and already reports exit code ${step.exitCode}, so a ` +
        "real terminal result is on its way and forcing one now would overwrite it",
    }
  }
  return {
    kind: "patch",
    patch: {
      pageTypeSlug: STEP,
      id: step.id,
      ifStatus: step.status === LAUNCHING ? LAUNCHING : RUNNING,
      set: {
        status: FAILED,
        exitCode: opts.exitCode,
        failureReason: opts.failureReason,
        completedAt: opts.completedAt,
      },
    },
  }
}
