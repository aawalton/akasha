export interface StepRun {
  readonly pipelineSeq: number | undefined
  readonly branch: string | undefined
  readonly workflowName: string | undefined
  readonly status: string | undefined
  readonly durationMs: number | undefined
  readonly stepSeconds: number | undefined
  readonly startedAt: string | undefined
}

export interface StepCostSummary {
  readonly step: string
  readonly runs: number
  readonly timedRuns: number
  readonly minMs: number | undefined
  readonly medianMs: number | undefined
  readonly maxMs: number | undefined
}

export function summarizeRuns(step: string, runs: readonly StepRun[]): StepCostSummary {
  const timed = runs
    .map((run) => run.durationMs)
    .filter((ms): ms is number => ms !== undefined)
    .sort((a, b) => a - b)

  const middle = Math.floor(timed.length / 2)
  const upper = timed[middle]
  const lower = timed[timed.length % 2 === 1 ? middle : middle - 1]
  const minMs = timed[0]
  const maxMs = timed.at(-1)

  if (upper === undefined || lower === undefined || minMs === undefined || maxMs === undefined) {
    return {
      step,
      runs: runs.length,
      timedRuns: 0,
      minMs: undefined,
      medianMs: undefined,
      maxMs: undefined,
    }
  }

  return {
    step,
    runs: runs.length,
    timedRuns: timed.length,
    minMs,
    medianMs: (lower + upper) / 2,
    maxMs,
  }
}

export function toSeconds(ms: number | undefined): number | undefined {
  if (ms === undefined) return undefined
  return Math.round(ms / 100) / 10
}

function cell(value: string | number | undefined): string {
  return value === undefined ? "" : String(value)
}

export function renderStepCostTsv(summary: StepCostSummary, runs: readonly StepRun[]): string {
  const header: Array<[string, string | number | undefined]> = [
    ["step", summary.step],
    ["runs", summary.runs],
    ["timedRuns", summary.timedRuns],
    ["minMs", summary.minMs],
    ["medianMs", summary.medianMs],
    ["maxMs", summary.maxMs],
  ]
  const lines = header
    .filter(([, value]) => value !== undefined)
    .map(([k, v]) => `${k}\t${cell(v)}`)
  if (runs.length === 0) return lines.join("\n")
  lines.push("")
  for (const run of runs) {
    lines.push(
      [
        cell(run.pipelineSeq),
        cell(run.branch),
        cell(run.workflowName),
        cell(run.status),
        cell(run.durationMs),
        cell(run.stepSeconds),
        cell(run.startedAt),
      ].join("\t")
    )
  }
  return lines.join("\n")
}
