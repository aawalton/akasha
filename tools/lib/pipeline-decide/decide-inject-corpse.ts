import { buildContainerName } from "../ci-container-dispatcher/container-name.ts"
import { MAIN_BRANCH } from "../sweep-pipeline-pages/statuses.ts"

export const MERGE_QUEUE_STAGING_BRANCH = "merge-queue/staging"

export const CORPSE_NAMESPACE = "ci"

export function branchTier(branch: string): 0 | 1 | 2 {
  if (branch === MAIN_BRANCH) return 0
  if (branch === MERGE_QUEUE_STAGING_BRANCH) return 1
  return 2
}

export interface InjectCorpseTarget {
  readonly seq: string
  readonly branch: string
  readonly commit: string
}

export interface PendingStepRef {
  readonly id: string
  readonly stepName: string
}

export type StepResolution =
  | { readonly kind: "selected"; readonly step: PendingStepRef }
  | { readonly kind: "none" }
  | { readonly kind: "ambiguous"; readonly names: readonly string[] }
  | { readonly kind: "not-matched"; readonly selector: string }

export interface StepSelector {
  readonly stepId?: string
  readonly stepName?: string
}

export interface InjectCorpseInput {
  readonly target: InjectCorpseTarget
  readonly stepResolution: StepResolution
}

export type InjectCorpseDecision =
  | {
      readonly kind: "inject"
      readonly containerName: string
      readonly stepId: string
      readonly stepName: string
      readonly namespace: typeof CORPSE_NAMESPACE
    }
  | { readonly kind: "refuse"; readonly reason: string }

function oneOf(steps: readonly PendingStepRef[]): StepResolution {
  if (steps.length === 0) return { kind: "none" }
  if (steps.length > 1) return { kind: "ambiguous", names: steps.map((one) => one.stepName) }
  const only = steps[0]
  return only === undefined ? { kind: "none" } : { kind: "selected", step: only }
}

export function selectPendingStep(
  steps: readonly PendingStepRef[],
  selector: StepSelector
): StepResolution {
  if (selector.stepId !== undefined) {
    const hit = steps.find((one) => one.id === selector.stepId)
    return hit === undefined
      ? { kind: "not-matched", selector: `--step-id ${selector.stepId}` }
      : { kind: "selected", step: hit }
  }
  if (selector.stepName !== undefined) {
    const named = steps.filter((one) => one.stepName === selector.stepName)
    if (named.length === 0) {
      return { kind: "not-matched", selector: `--step-name ${selector.stepName}` }
    }
    return oneOf(named)
  }
  return oneOf(steps)
}

function refuse(reason: string): InjectCorpseDecision {
  return { kind: "refuse", reason }
}

export function decideInjectCorpse(input: InjectCorpseInput): InjectCorpseDecision {
  const { target, stepResolution } = input

  const tier = branchTier(target.branch)
  if (tier < 2) {
    return refuse(
      `pipeline ${target.seq} stands on \`${target.branch}\` (tier ${tier}), and inject-corpse ` +
        "plants a fault only on an ordinary feature branch (tier 2): main (tier 0) and the " +
        "merge-queue staging lane (tier 1) are live-critical lanes a planted fault must never touch"
    )
  }
  if (stepResolution.kind === "none") {
    return refuse(
      `pipeline ${target.seq} holds no pending step, and inject-corpse plants a corpse in front ` +
        "of a step that has not launched yet"
    )
  }
  if (stepResolution.kind === "ambiguous") {
    const named = stepResolution.names
    return refuse(
      `pipeline ${target.seq} holds ${named.length} pending steps (${named.join(", ")}), so name ` +
        "one of them with --step-name or --step-id"
    )
  }
  if (stepResolution.kind === "not-matched") {
    return refuse(`no pending step in pipeline ${target.seq} matched ${stepResolution.selector}`)
  }

  const { step } = stepResolution
  return {
    kind: "inject",
    containerName: buildContainerName(target.seq, step.stepName, target.commit),
    stepId: step.id,
    stepName: step.stepName,
    namespace: CORPSE_NAMESPACE,
  }
}
