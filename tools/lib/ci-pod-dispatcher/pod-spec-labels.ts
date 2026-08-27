import { sanitizeDnsName, STEP_LABEL_KEY } from "../ci-container-dispatcher/container-name.ts"
import type { RunToCompletionContext, StepConfig } from "./pod-spec-step-config.ts"

export interface BuildPodLabelsArgs {
  context: RunToCompletionContext
  step: StepConfig
  shortSha: string
  fullSha: string | undefined
}

export function buildPodLabels(args: BuildPodLabelsArgs): Record<string, string> {
  const { context, step, shortSha, fullSha } = args
  const labels: Record<string, string> = {
    "app.kubernetes.io/name": "pipeline-engine-step",
    "app.kubernetes.io/managed-by": "pipeline-engine",
    "pipeline-engine/pipeline": String(context.seq),
    "pipeline-engine/workflow": sanitizeDnsName(context.workflowName),
    [STEP_LABEL_KEY]: sanitizeDnsName(step.name),
    "pipeline-engine/sha": shortSha,
  }
  if (fullSha !== undefined) {
    labels["pipeline-engine/commit-sha"] = fullSha
  }
  if (context.inputsHash !== undefined) {
    labels["pipeline-engine/inputs-hash"] = context.inputsHash
  }
  return labels
}
