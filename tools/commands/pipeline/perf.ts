
export const summary = "Compute timing metrics for one pipeline: total wall-clock, total step-seconds, and per-step durations"

import type { CommandHelp } from "../../ops/surface.ts"
import { parseArgs } from "../../lib/parse-args.ts"
import {
  getPipelineBySeq,
  listStepsForPipeline,
  optionalNumber,
  optionalString,
} from "../../lib/pipeline-pages/read.ts"
import { computeSoloMs, type StepSpan } from "../../lib/pipeline-report/step-solo.ts"
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
    { name: "--json", description: "Emit JSON instead of TSV" },
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
    { code: 2, meaning: "pipeline not found" },
    { code: 3, meaning: "the pipeline pages could not be read" },
  ],
  examples: [
    "ops pipeline perf 8200",
    "ops pipeline perf --seq 8200",
    "ops pipeline perf --seq 8200 --json",
  ],
}


interface StepRow {
  workflowName: string
  stepName: string | undefined
  status: string | undefined
  durationMs: number | undefined
  stepSeconds: number | undefined
  soloMs: number | undefined
  soloSeconds: number | undefined
  dispatchedAt: string | undefined
  startedAt: string | undefined
  completedAt: string | undefined
}

interface PipelineFields {
  seq: number | undefined
  status: string | undefined
  firstDispatchedAt: string | undefined
  lastCompletedAt: string | undefined
  wallClockMs: number | undefined
  wallClockSeconds: number | undefined
  totalStepMs: number
  totalStepSeconds: number
  totalSoloMs: number
  totalSoloSeconds: number
}

function toSeconds(ms: number | undefined): number | undefined {
  if (ms === undefined) return undefined
  return Math.round(ms / 100) / 10
}

function parseIsoMs(value: string | undefined): number | undefined {
  if (value === undefined) return undefined
  const ms = Date.parse(value)
  return Number.isNaN(ms) ? undefined : ms
}

function computeSpanMs(from: string | undefined, to: string | undefined): number | undefined {
  const start = parseIsoMs(from)
  const end = parseIsoMs(to)
  if (start === undefined || end === undefined) return undefined
  if (end < start) return undefined
  return end - start
}

function earliestOf(values: readonly (string | undefined)[]): string | undefined {
  let standing: number | undefined
  let answer: string | undefined
  for (const value of values) {
    const ms = parseIsoMs(value)
    if (ms === undefined) continue
    if (standing === undefined || ms < standing) {
      standing = ms
      answer = value
    }
  }
  return answer
}

function latestOf(values: readonly (string | undefined)[]): string | undefined {
  let standing: number | undefined
  let answer: string | undefined
  for (const value of values) {
    const ms = parseIsoMs(value)
    if (ms === undefined) continue
    if (standing === undefined || ms > standing) {
      standing = ms
      answer = value
    }
  }
  return answer
}

function formatNumber(value: number | undefined): string {
  return value === undefined ? "" : String(value)
}

function renderTsv(pipeline: PipelineFields, steps: readonly StepRow[]): string {
  const headerEntries: Array<[string, string | number | undefined]> = [
    ["seq", pipeline.seq],
    ["status", pipeline.status],
    ["firstDispatchedAt", pipeline.firstDispatchedAt],
    ["lastCompletedAt", pipeline.lastCompletedAt],
    ["wallClockMs", pipeline.wallClockMs],
    ["wallClockSeconds", pipeline.wallClockSeconds],
    ["totalStepMs", pipeline.totalStepMs],
    ["totalStepSeconds", pipeline.totalStepSeconds],
    ["totalSoloMs", pipeline.totalSoloMs],
    ["totalSoloSeconds", pipeline.totalSoloSeconds],
  ]
  const lines: string[] = []
  for (const [key, value] of headerEntries) {
    if (value === undefined) continue
    lines.push(`${key}\t${value}`)
  }
  if (steps.length === 0) return lines.join("\n")
  lines.push("")
  for (const s of steps) {
    lines.push(
      `${s.workflowName}\t${s.stepName ?? ""}\t${s.status ?? ""}\t${formatNumber(s.durationMs)}\t${formatNumber(s.stepSeconds)}\t${formatNumber(s.soloMs)}\t${formatNumber(s.soloSeconds)}`
    )
  }
  return lines.join("\n")
}

export default async function pipelinePerf(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const seq = parsed.requireNonNegativeInt("--seq")
  const json = parsed.boolean("--json")

  const roots = resolveRoots()
  const pipeline = getPipelineBySeq(roots, seq)
  const stepRows = listStepsForPipeline(roots, { pipeline })

  const status = optionalString(pipeline, "status")

  const spans: readonly StepSpan[] = stepRows.map((row) => ({
    startedAt: optionalString(row, "startedAt"),
    completedAt: optionalString(row, "completedAt"),
  }))
  const soloMsByIndex = computeSoloMs(spans)

  const steps: StepRow[] = stepRows
    .map((row, index) => {
      const span = spans[index]
      const startedAt = span?.startedAt
      const stepCompletedAt = span?.completedAt
      const durationMs = computeSpanMs(startedAt, stepCompletedAt)
      const soloMs = soloMsByIndex[index]
      return {
        workflowName: row.workflowName,
        stepName: optionalString(row, "title"),
        status: optionalString(row, "status"),
        durationMs,
        stepSeconds: toSeconds(durationMs),
        soloMs,
        soloSeconds: toSeconds(soloMs),
        dispatchedAt: optionalString(row, "dispatchedAt"),
        startedAt,
        completedAt: stepCompletedAt,
      }
    })
    .sort((a, b) => (b.durationMs ?? -1) - (a.durationMs ?? -1))

  const firstDispatchedAt = earliestOf(steps.map((s) => s.dispatchedAt))
  const lastCompletedAt = latestOf(steps.map((s) => s.completedAt))
  const wallClockMs = computeSpanMs(firstDispatchedAt, lastCompletedAt)

  const totalStepMs = steps.reduce((sum, s) => sum + (s.durationMs ?? 0), 0)
  const totalSoloMs = steps.reduce((sum, s) => sum + (s.soloMs ?? 0), 0)

  const pipelineFields: PipelineFields = {
    seq: optionalNumber(pipeline, "seq"),
    status,
    firstDispatchedAt,
    lastCompletedAt,
    wallClockMs,
    wallClockSeconds: toSeconds(wallClockMs),
    totalStepMs,
    totalStepSeconds: Math.round(totalStepMs / 100) / 10,
    totalSoloMs,
    totalSoloSeconds: Math.round(totalSoloMs / 100) / 10,
  }

  if (json) {
    process.stdout.write(`${JSON.stringify({ pipeline: pipelineFields, steps })}\n`)
    return
  }
  process.stdout.write(`${renderTsv(pipelineFields, steps)}\n`)
}
