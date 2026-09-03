import { getCommitTreeSha } from "@akasha/git/tree-sha"
import {
  commitSha40,
  type InputsHash12,
  inputsHash12,
  toShortSha7,
  treeSha40,
} from "@akasha/workflow-language/ci-identifiers"
import { computeInputsHash } from "@akasha/workflow-language/inputs-hash"
import type { CIContext, Workflow } from "@akasha/workflow-language/workflow-types"
import type { LocalExecutor } from "../local-executor/executor.ts"
import type { PipelineContext } from "../local-executor/types.ts"
import { requireGet } from "../narrow.ts"
import { dslStepToConfig, dslStepToNode, type StepStatus } from "./dsl.ts"
import {
  evaluateWhenCondition,
  getDispatchableSteps,
  isWorkflowComplete,
  propagateFailure,
} from "./scheduler.ts"

export interface RunWorkflowOpts {
  workflowName: string
  workflow: Workflow
  seq: number
  sha: string
  branch: string
  event: string
  repoRoot: string
  executor: LocalExecutor
  secrets: Map<string, string>
  graphFileSet: readonly string[]
}

export type RunWorkflowResult = { ok: true } | { ok: false; error: string; step: string }

export async function runWorkflow(opts: RunWorkflowOpts): Promise<RunWorkflowResult> {
  const {
    workflowName,
    workflow,
    seq,
    sha,
    branch,
    event,
    repoRoot,
    executor,
    secrets,
    graphFileSet,
  } = opts

  const brandedSha = commitSha40(sha)
  const shortSha = toShortSha7(brandedSha)
  let inputsHash: InputsHash12 = inputsHash12(sha.slice(0, 12))
  if (graphFileSet.length > 0) {
    inputsHash = await computeInputsHash({ workspace: repoRoot, graphFileSet })
    console.log(`[bootstrap] Inputs hash: ${inputsHash}`)
  }
  const treeSha = treeSha40(await getCommitTreeSha(repoRoot, brandedSha))

  const ci: CIContext = {
    workspace: repoRoot,
    commitSha: brandedSha,
    treeSha,
    shortSha,
    inputsHash,
    seq: String(seq),
    branch,
    changedFiles: [],
  }

  const ctx: PipelineContext = {
    sha,
    seq,
    workflowName,
    workspaceName: repoRoot,
    namespace: "local",
    secrets,
    branch,
    repoFullName: "alan/akasha",
    commitAuthor: "local",
    commitMessage: "local bootstrap",
  }

  const activeSteps = (workflow.steps ?? []).filter((s) => !s.name.includes("notify"))
  const stepConfigs = activeSteps.map((s) => dslStepToConfig(s, ci, repoRoot))
  const stepNodes = activeSteps.map(dslStepToNode)
  const stepConfigMap = new Map(stepConfigs.map((s) => [s.name, s]))

  if (stepConfigs.length === 0) {
    console.log(`[bootstrap] ${workflowName}: no steps`)
    return { ok: true }
  }

  const statuses = new Map<string, StepStatus>(stepConfigs.map((s) => [s.name, "pending"]))
  let firstFailedStep: string | null = null
  let firstFailedError: string | null = null

  while (true) {
    const { complete, status: workflowStatus } = isWorkflowComplete(stepNodes, statuses)
    if (complete) {
      console.log(`[bootstrap] ${workflowName}: ${workflowStatus}`)
      if (workflowStatus === "completed") return { ok: true }
      return {
        ok: false,
        step: firstFailedStep ?? workflowName,
        error: firstFailedError ?? `workflow ${workflowName} failed`,
      }
    }

    const dispatchable = getDispatchableSteps(stepNodes, statuses)
    if (dispatchable.length === 0) {
      console.error(`[bootstrap] No dispatchable steps but workflow not complete`)
      return {
        ok: false,
        step: workflowName,
        error: `no dispatchable steps but workflow ${workflowName} not complete`,
      }
    }

    await Promise.all(
      dispatchable.map(async (node) => {
        if (!evaluateWhenCondition(node, statuses, event)) {
          console.log(`[bootstrap] ${node.name}: skipped (when condition)`)
          statuses.set(node.name, "skipped")
          return
        }

        const config = requireGet(stepConfigMap, node.name, "stepConfigMap")
        console.log(`[bootstrap] ${node.name}: running...`)
        statuses.set(node.name, "running")

        const result = await executor.executeStep(config, ctx)

        if (result.success) {
          console.log(`[bootstrap] ${node.name}: completed (${result.duration}ms)`)
          statuses.set(node.name, "completed")
        } else {
          console.error(
            `[bootstrap] ${node.name}: failed (exit ${result.exitCode}, ${result.duration}ms)`
          )
          if (result.logs !== "") console.error(result.logs.slice(-2000))
          statuses.set(node.name, "failed")

          if (firstFailedStep === null) {
            firstFailedStep = node.name
            firstFailedError = `step ${node.name} failed (exit ${result.exitCode})${
              result.logs !== "" ? `: ${result.logs.slice(-500)}` : ""
            }`
          }

          const toSkip = propagateFailure(node.name, stepNodes, statuses)
          for (const name of toSkip) statuses.set(name, "skipped")
          if (toSkip.length > 0)
            console.log(`[bootstrap] Skipped ${toSkip.length} downstream steps`)
        }
      })
    )
  }
}
