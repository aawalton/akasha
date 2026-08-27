export const summary = "List steps for a pipeline (optionally filtered by workflow or status)"

import type { CommandHelp } from "../../ops/surface.ts"
import { parseArgs } from "../../lib/parse-args.ts"
import {
  getPipelineBySeq,
  listStepsForPipeline,
  optionalNumber,
  optionalString,
} from "../../lib/pipeline-pages/read.ts"
import { computeDurationMs, formatStepRow } from "../../lib/pipeline-report/steps-format.ts"
import { resolveRoots } from "../../../repo/roots/roots"

export const help: CommandHelp = {
  flags: [
    {
      name: "--seq",
      argLabel: "<n>",
      valueShape: "token",
      required: true,
      description: "Pipeline sequence number",
    },
    {
      name: "--workflow",
      argLabel: "<name>",
      valueShape: "token",
      description: "Filter to steps in one workflow by name",
    },
    {
      name: "--status",
      argLabel: "<s>",
      valueShape: "token",
      description: "Filter to one step status",
    },
    { name: "--json", description: "Emit JSON array instead of TSV" },
  ],
  positionals: [
    {
      name: "seq",
      required: false,
      aliasOfFlag: "--seq",
      description: "Pipeline sequence number",
    },
  ],
  exits: [
    { code: 2, meaning: "pipeline or workflow not found" },
    { code: 3, meaning: "the pipeline pages could not be read" },
  ],
  examples: [
    "ops pipeline steps 8200",
    "ops pipeline steps --seq 8200",
    "ops pipeline steps --seq 8200 --workflow checks",
    "ops pipeline steps --seq 8200 --status failed --json",
  ],
}

export default async function pipelineSteps(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const seq = parsed.requireNonNegativeInt("--seq")
  const workflowName = parsed.string("--workflow")
  const status = parsed.string("--status")
  const json = parsed.boolean("--json")

  const roots = resolveRoots()
  const pipeline = getPipelineBySeq(roots, seq)
  const steps = listStepsForPipeline(roots, { pipeline, workflowName, status })

  const projected = steps.map((row) => {
    const startedAt = optionalString(row, "startedAt")
    const completedAt = optionalString(row, "completedAt")
    return {
      workflowName: row.workflowName,
      stepName: optionalString(row, "title"),
      status: optionalString(row, "status"),
      exitCode: optionalNumber(row, "exitCode"),
      durationMs: computeDurationMs(startedAt, completedAt),
      podName: optionalString(row, "containerName"),
      startedAt,
      completedAt,
      failReason: optionalString(row, "failureReason"),
      skipReason: optionalString(row, "skipReason"),
      admissionRejectedReason: optionalString(row, "launchRefusedReason"),
      blockedBy: optionalString(row, "blockedBy"),
      infraSignatureClass: optionalString(row, "infraSignatureClass"),
      dispatchWaitReason: optionalString(row, "dispatchWaitReason"),
      dispatchWaitNode: optionalString(row, "dispatchWaitNode"),
      dispatchWaitSince: optionalNumber(row, "dispatchWaitSince"),
    }
  })

  if (json) {
    process.stdout.write(`${JSON.stringify(projected)}\n`)
    return
  }

  if (projected.length === 0) return
  const nowMs = Date.now()
  const lines = projected.map((step) => formatStepRow(step, nowMs))
  process.stdout.write(`${lines.join("\n")}\n`)
}
