import { checkoutPath } from "../ci-container-dispatcher/container-name.ts"
import { MAX_ARG_STRLEN, oversizeRefusal } from "../ci-container-dispatcher/container-script.ts"
import {
  buildCallbackRequiringWon,
  buildCallbackRequiringWonWithFallback,
  buildPageWritePostCommand,
  refuseUnrecordedCallback,
} from "./callback-shell.ts"
import { buildOutputBlock } from "./pod-spec-helpers.ts"
import type { RunToCompletionContext, StepConfig } from "./pod-spec-step-config.ts"

export interface BuildEntrypointArgs {
  context: RunToCompletionContext
  step: StepConfig
}

const HEARTBEAT_INTERVAL_SECONDS = 60

const ISO_UTC_NOW_SHELL =
  '$(d=$(date -u +%Y-%m-%dT%H:%M:%S.%3NZ); case "$d" in *.[0-9][0-9][0-9]Z) ;; *) d=$(date -u +%Y-%m-%dT%H:%M:%SZ);; esac; echo "$d")'

export function buildTreeIntegrityGate(wsPath: string): string {
  return `if command -v git >/dev/null 2>&1 && git -C ${wsPath} rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  __ci_missing=$(git -C ${wsPath} ls-files --deleted 2>/dev/null || true)
  if [ -n "$__ci_missing" ]; then
    __ci_missing_n=$(printf '%s\\n' "$__ci_missing" | grep -c .)
    __ci_missing_head=$(printf '%s\\n' "$__ci_missing" | head -20 | tr '\\n' ' ')
    echo "ERROR: partial CI tree at ${wsPath} (pod=$POD_NAME workflow=$WORKFLOW_NAME step=$STEP_NAME): $__ci_missing_n tracked file(s) missing from the materialized checkout. First missing: $__ci_missing_head" >&2
    exit 4
  fi
fi`
}

export const UNCLAIMED_STEP_EXIT = 6

export const UNRECORDED_COMPLETION_EXIT = 7

export function buildEntrypointShell(args: BuildEntrypointArgs): string {
  const { context, step } = args
  const shell = step.shell ?? ["/bin/sh", "-c"]
  const wsPath = checkoutPath(context.sha)
  const commandsJoined = step.commands.join("\n")

  const isPreparation = context.workflowName === "preparation"
  const cdBlock = isPreparation
    ? ""
    : `if [ ! -d ${wsPath} ]; then
  echo "ERROR: CI workspace ${wsPath} not found on this node (pod=$POD_NAME workflow=$WORKFLOW_NAME step=$STEP_NAME). Preparation may have raced, been skipped, or been garbage-collected." >&2
  exit 3
fi
cd ${wsPath}
${buildTreeIntegrityGate(wsPath)}`

  const outputBlock = buildOutputBlock(step)

  const startedSubstitutions = [
    { token: "@@POD_NAME@@", shellValue: "$POD_NAME" },
    { token: "@@STARTED_AT@@", shellValue: ISO_UTC_NOW_SHELL },
  ] as const
  const stepPath = "$STEP_PAGE_PATH"
  const startedPost = buildPageWritePostCommand({
    templateEnvVar: "STARTED_BODY_TEMPLATE",
    pathShellValue: stepPath,
    substitutions: startedSubstitutions,
  })
  const startedPostFallback = buildPageWritePostCommand({
    templateEnvVar: "STARTED_BODY_TEMPLATE_FALLBACK",
    pathShellValue: stepPath,
    substitutions: startedSubstitutions,
  })
  const completePost = buildPageWritePostCommand({
    templateEnvVar: "COMPLETE_BODY_TEMPLATE",
    pathShellValue: stepPath,
    substitutions: [
      {
        token: "@@TERMINAL_STATUS@@",
        shellValue: "$([ $EXIT_CODE -eq 0 ] && echo passed || echo failed)",
      },
      { token: "@@EXIT_CODE@@", shellValue: "$EXIT_CODE" },
      { token: "@@COMPLETED_AT@@", shellValue: ISO_UTC_NOW_SHELL },
    ],
  })

  const heartbeatStart = `CI_WS_HEARTBEAT_DIR=${wsPath}
( while true; do [ -d "$CI_WS_HEARTBEAT_DIR" ] && touch "$CI_WS_HEARTBEAT_DIR" 2>/dev/null; sleep ${String(HEARTBEAT_INTERVAL_SECONDS)}; done ) &
CI_WS_HEARTBEAT_PID=$!`
  const heartbeatStop = `kill "$CI_WS_HEARTBEAT_PID" 2>/dev/null || true`

  const assemble = (body: string): string =>
    [
      `#!${shell[0]}`,
      `echo "[step-started] ${step.name}"`,
      buildCallbackRequiringWonWithFallback("step-started", startedPost, startedPostFallback),
      refuseUnrecordedCallback(
        UNCLAIMED_STEP_EXIT,
        "this step was never claimed, so its commands were not run: nothing moved its page to running"
      ),
      heartbeatStart,
      `(set -e
${cdBlock}
${body}
)`,
      "EXIT_CODE=$?",
      heartbeatStop,
      buildCallbackRequiringWon("step-complete", completePost),
      refuseUnrecordedCallback(
        UNRECORDED_COMPLETION_EXIT,
        "this step ran to exit $EXIT_CODE but nothing recorded that outcome, so its page still reads running"
      ),
      "exit $EXIT_CODE",
    ].join("\n")

  const entrypoint = assemble(`${outputBlock}${commandsJoined}`)
  const size = Buffer.byteLength(entrypoint, "utf8")
  if (size <= MAX_ARG_STRLEN) return entrypoint
  return assemble(oversizeRefusal(step.name, size, shell[0] ?? "/bin/sh"))
}
