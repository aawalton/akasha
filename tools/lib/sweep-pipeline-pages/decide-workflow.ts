import {
  ANSWERED_ELSEWHERE,
  ANSWERED_PRESERVE,
  BLOCKED,
  DISPATCHING,
  FAILED,
  OVERTAKEN,
  PASSED,
  PENDING,
  RUNNING,
  SKIPPED,
  STEP_NEGATIVE,
  STEP_TERMINAL,
  UNDERWAY,
  WORKFLOW,
  WORKFLOW_NEGATIVE,
  WORKFLOW_POSITIVE,
  WORKFLOW_TERMINAL,
} from "@akasha/pipeline-sweep/pipeline-page-statuses"
import type { Pipeline, Step, Workflow } from "@akasha/pipeline-sweep/pipeline-row-entities"
import { type Effect, transition } from "./effects.ts"

export const DEPLOYED_COMMIT_MATCH = "deployed-commit-match"

export const INPUTS_HASH_MATCH = "inputs-hash-match"

function failedStepTitles(steps: readonly Step[]): readonly string[] {
  return steps.filter((one) => STEP_NEGATIVE.has(one.status)).map((one) => one.title)
}

function rollUp(workflow: Workflow, steps: readonly Step[]): readonly Effect[] {
  const from = workflow.status
  if (steps.length > 0 && steps.every((one) => STEP_TERMINAL.has(one.status))) {
    const failed = failedStepTitles(steps)
    if (failed.length > 0) {
      return [
        transition(WORKFLOW, workflow.seq, from, FAILED, `workflow.${from}-to-failed.step-failed`, {
          "failed-steps": failed,
        }),
      ]
    }
    return [
      transition(WORKFLOW, workflow.seq, from, PASSED, `workflow.${from}-to-passed.steps-done`),
    ]
  }
  if (steps.length === 0) {
    return [transition(WORKFLOW, workflow.seq, from, PASSED, `workflow.${from}-to-passed.stepless`)]
  }
  if (
    from === DISPATCHING &&
    steps.some((one) => one.status === RUNNING || one.status === PASSED || one.status === FAILED)
  ) {
    return [
      transition(
        WORKFLOW,
        workflow.seq,
        from,
        RUNNING,
        "workflow.dispatching-to-running.step-running"
      ),
    ]
  }
  return []
}

function decidePending(
  workflow: Workflow,
  pipeline: Pipeline,
  siblings: readonly Workflow[],
  steps: readonly Step[]
): readonly Effect[] {
  if (
    !workflow.alwaysRuns &&
    workflow.deployedCommit !== null &&
    pipeline.commit !== "" &&
    workflow.deployedCommit === pipeline.commit
  ) {
    return [
      transition(
        WORKFLOW,
        workflow.seq,
        PENDING,
        SKIPPED,
        "workflow.pending-to-skipped.deployed-commit",
        {
          "skip-reason": DEPLOYED_COMMIT_MATCH,
        }
      ),
    ]
  }

  if (
    !workflow.alwaysRuns &&
    workflow.inputsHash !== null &&
    workflow.deployedInputsHash !== null &&
    workflow.deployedInputsHash === workflow.inputsHash
  ) {
    return [
      transition(
        WORKFLOW,
        workflow.seq,
        PENDING,
        SKIPPED,
        "workflow.pending-to-skipped.inputs-hash",
        {
          "skip-reason": INPUTS_HASH_MATCH,
        }
      ),
    ]
  }

  const statusBySlug = new Map<string, string>()
  for (const one of siblings) if (one.seq !== workflow.seq) statusBySlug.set(one.slug, one.status)

  const met = workflow.dependsOn.every((slug) => {
    const stands = statusBySlug.get(slug)
    return stands === undefined || WORKFLOW_POSITIVE.has(stands)
  })

  if (met && steps.length === 0) {
    return [
      transition(WORKFLOW, workflow.seq, PENDING, PASSED, "workflow.pending-to-passed.stepless"),
    ]
  }

  if (met && UNDERWAY.has(pipeline.status)) {
    return [
      transition(
        WORKFLOW,
        workflow.seq,
        PENDING,
        DISPATCHING,
        "workflow.pending-to-dispatching.dependencies-met"
      ),
    ]
  }

  for (const slug of workflow.dependsOn) {
    const stands = statusBySlug.get(slug)
    if (stands !== undefined && WORKFLOW_NEGATIVE.has(stands)) {
      return [
        transition(
          WORKFLOW,
          workflow.seq,
          PENDING,
          BLOCKED,
          "workflow.pending-to-blocked.dependency-failed",
          {
            "failed-dependency": slug,
          }
        ),
      ]
    }
  }

  return []
}

export function decideWorkflow(
  workflow: Workflow,
  pipeline: Pipeline,
  siblings: readonly Workflow[],
  steps: readonly Step[]
): readonly Effect[] {
  if (pipeline.status === ANSWERED_ELSEWHERE) {
    if (ANSWERED_PRESERVE.has(workflow.status) || workflow.status === ANSWERED_ELSEWHERE) return []
    return [
      transition(
        WORKFLOW,
        workflow.seq,
        workflow.status,
        ANSWERED_ELSEWHERE,
        "workflow.any-to-answered-elsewhere.pipeline-answered"
      ),
    ]
  }

  if (WORKFLOW_TERMINAL.has(workflow.status)) return []

  if (pipeline.status === OVERTAKEN) {
    return [
      transition(
        WORKFLOW,
        workflow.seq,
        workflow.status,
        OVERTAKEN,
        "workflow.any-to-overtaken.pipeline-overtaken"
      ),
    ]
  }

  if (workflow.status === PENDING) return decidePending(workflow, pipeline, siblings, steps)

  if (UNDERWAY.has(workflow.status)) return rollUp(workflow, steps)

  return []
}
