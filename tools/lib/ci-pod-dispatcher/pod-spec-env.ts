import {
  akashaTreePath,
  checkoutPath,
  instructionsTreePath,
} from "../ci-container-dispatcher/container-name.ts"
import { rootEnvName } from "../../../repo/roots/roots"
import { CI_SECRET_NAME, toolchainEnv } from "./pod-spec-helpers.ts"
import type { RunToCompletionContext, StepConfig } from "./pod-spec-step-config.ts"
import { type K8sEnvVar, resolveStepEnv, supabaseSecretEnv } from "./secrets.ts"

export interface BuildPodEnvArgs {
  context: RunToCompletionContext
  step: StepConfig
  podName: string
  pageQueryOrigin: string
  stepPagePath: string
  startedTemplate: string
  startedTemplateFallback: string
  completeTemplate: string
}

export function buildPodEnv(args: BuildPodEnvArgs): readonly K8sEnvVar[] {
  const {
    context,
    step,
    podName,
    pageQueryOrigin,
    stepPagePath,
    startedTemplate,
    startedTemplateFallback,
    completeTemplate,
  } = args
  const wsPath = checkoutPath(context.sha)

  const stepEnv: readonly K8sEnvVar[] = step.environment
    ? resolveStepEnv(step.environment, CI_SECRET_NAME)
    : []

  return [
    ...toolchainEnv(step.image),
    { name: "HOME", value: "/tmp" },
    { name: "BUN_TMPDIR", value: "/tmp" },
    { name: "XDG_CACHE_HOME", value: "/tmp" },
    { name: "BUN_INSTALL", value: "/tmp/.bun" },
    { name: "DOCKER_CONFIG", value: "/tmp/.docker" },
    ...stepEnv,
    ...(context.gitAccessToken !== ""
      ? [{ name: "GIT_ACCESS_TOKEN", value: context.gitAccessToken }]
      : []),
    { name: "PIPELINE_SEQ", value: String(context.seq) },
    { name: "CI_SEQ", value: String(context.seq) },
    { name: "WORKFLOW_NAME", value: context.workflowName },
    { name: "STEP_NAME", value: step.name },
    { name: "CI_COMMIT_SHA", value: context.sha },
    { name: "BRANCH", value: context.branch },
    { name: "POD_NAME", value: podName },
    { name: "WORKSPACE", value: wsPath },
    { name: "INSTRUCTIONS_ROOT", value: instructionsTreePath(context.sha) },
    { name: rootEnvName("akasha"), value: akashaTreePath(context.sha) },
    ...(context.inputsHash !== undefined
      ? [{ name: "INPUTS_HASH", value: context.inputsHash }]
      : []),
    { name: "PAGE_QUERY_ORIGIN", value: pageQueryOrigin },
    { name: "STEP_PAGE_PATH", value: stepPagePath },
    ...supabaseSecretEnv(CI_SECRET_NAME),
    { name: "STARTED_BODY_TEMPLATE", value: startedTemplate },
    { name: "STARTED_BODY_TEMPLATE_FALLBACK", value: startedTemplateFallback },
    { name: "COMPLETE_BODY_TEMPLATE", value: completeTemplate },
  ]
}
