export const summary = "What one named step costs across its recent runs, in one call: per-run duration with the pipeline and branch it ran on, plus min/median/max — the question `pipeline perf` can only answer one pipeline at a time"

import type { CommandHelp } from "../../ops/surface.ts"
import { inputError } from "../../lib/exit.ts"
import { parseArgs } from "../../lib/parse-args.ts"
import { listStepRunsByName } from "../../lib/pipeline-pages/read.ts"
import {
  renderStepCostTsv,
  type StepRun,
  summarizeRuns,
  toSeconds,
} from "../../lib/pipeline-report/step-cost-format.ts"
import { resolveRoots } from "../../../repo/roots/roots"

const MAX_LIMIT = 200

export const help: CommandHelp = {
  flags: [
    {
      name: "--step",
      argLabel: "<name>",
      valueShape: "token",
      required: true,
      description: "Step name, exactly as `ops pipeline perf` prints it (e.g. check-addon-build)",
    },
    {
      name: "--limit",
      argLabel: "<n>",
      valueShape: "token",
      default: "20",
      description: "Runs to read, newest first (positive integer, at most 200, default 20)",
    },
    { name: "--json", description: "Emit JSON instead of TSV" },
  ],
  positionals: [
    {
      name: "step",
      required: false,
      aliasOfFlag: "--step",
      description: "Step name",
    },
  ],
  exits: [{ code: 3, meaning: "the pipeline pages could not be read" }],
  examples: [
    "ops pipeline step-cost check-addon-build",
    "ops pipeline step-cost --step check-unused-deps --limit 50",
    "ops pipeline step-cost --step check-addon-build --json",
  ],
}

function computeDurationMs(
  startedAt: string | undefined,
  completedAt: string | undefined
): number | undefined {
  if (startedAt === undefined || completedAt === undefined) return undefined
  const start = Date.parse(startedAt)
  const end = Date.parse(completedAt)
  if (Number.isNaN(start) || Number.isNaN(end) || end < start) return undefined
  return end - start
}

export default async function pipelineStepCost(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const stepName = parsed.requireString("--step")
  const limitRaw = parsed.string("--limit") ?? "20"
  const limit = Number(limitRaw)
  if (!Number.isInteger(limit) || limit <= 0) {
    throw inputError(`--limit must be a positive integer, got: ${limitRaw}`)
  }
  if (limit > MAX_LIMIT) {
    throw inputError(`--limit must be at most ${MAX_LIMIT}, got: ${limitRaw}`)
  }
  const json = parsed.boolean("--json")

  const rows = listStepRunsByName(resolveRoots(), { stepName, limit })

  const runs: StepRun[] = rows.map((row) => {
    const durationMs = computeDurationMs(row.startedAt, row.completedAt)
    return {
      pipelineSeq: row.pipelineSeq,
      branch: row.branch,
      workflowName: row.workflowName,
      status: row.status,
      durationMs,
      stepSeconds: toSeconds(durationMs),
      startedAt: row.startedAt,
    }
  })
  const summary = summarizeRuns(stepName, runs)

  if (json) {
    process.stdout.write(`${JSON.stringify({ summary, runs })}\n`)
    return
  }
  process.stdout.write(`${renderStepCostTsv(summary, runs)}\n`)
}
