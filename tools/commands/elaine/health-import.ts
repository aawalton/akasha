export const summary = "Import Alan's HealthKit history (active energy, steps) from an Apple Health export on the macbook into the raw sample store"

import { upsertHealthSamples } from "@alanwalton/health-samples-access/upsert"
import { buildFetchScript } from "@alanwalton/elaine-cli/lib/health-export"
import { IMPORT_METRICS } from "@alanwalton/elaine-cli/lib/health-import"
import { importReading } from "@alanwalton/elaine-cli/lib/health-import-reading"
import {
  type ImportOutcome,
  MAX_IMPORT_BATCH,
  NO_LOWER_BOUND,
  runHealthImport,
} from "@alanwalton/elaine-cli/lib/health-import-run"
import { MACBOOK } from "@alanwalton/elaine-cli/lib/host"
import { streamSshLines } from "@alanwalton/elaine-cli/lib/ssh"
import type { CommandHelp } from "../../ops/surface.ts"
import { dataError, inputError } from "../../lib/exit.ts"
import { emitReading } from "../../lib/reading-channel.ts"
import { parseArgs } from "../../lib/parse-args.ts"

const SINCE_DAY = /^\d{4}-\d{2}-\d{2}$/

export const help: CommandHelp = {
  reading: "emits",
  flags: [
    {
      name: "--path",
      argLabel: "<file>",
      valueShape: "token",
      description:
        "Explicit macbook path to an export .zip or an extracted export.xml (overrides the default scan)",
    },
    {
      name: "--since",
      argLabel: "<YYYY-MM-DD>",
      valueShape: "token",
      description:
        "Import only records starting on or after this civil date. Default: no lower bound — the whole history",
    },
    {
      name: "--batch",
      argLabel: "<n>",
      valueShape: "token",
      default: "1000",
      description: "Samples per write, 1..1000",
    },
    {
      name: "--dry-run",
      description:
        "Read and count without writing: reports records per metric and the earliest and latest instant of each",
    },
    {
      name: "--restart",
      description: "Ignore any checkpoint and import from the start of the export",
    },
    { name: "--json", description: "Emit the structured outcome as JSON" },
  ],
  exits: [
    { code: 1, meaning: "input error: --batch or --since malformed" },
    { code: 2, meaning: "data error: no Apple Health export found on the macbook" },
    { code: 3, meaning: "operational error: ssh against the macbook failed" },
  ],
  examples: [
    "ops elaine health-import --dry-run",
    "ops elaine health-import",
    "ops elaine health-import --since 2026-07-01",
    "ops elaine health-import --path '~/Downloads/export.zip' --json",
  ],
}

function isoMinute(ms: number | undefined): string {
  if (ms === undefined) return "—"
  return new Date(ms).toISOString().slice(0, 16).replace("T", " ")
}

function format(outcome: ImportOutcome, dryRun: boolean): string {
  const lines: string[] = []
  lines.push(
    `Apple Health import${dryRun ? " [dry run — nothing written]" : ""} — source ${outcome.sourceFile ?? "unknown"}`
  )
  lines.push(`exported ${isoMinute(outcome.exportedAtMs)} UTC`)
  if (outcome.resumedFrom > 0) {
    lines.push(`resumed after record line ${outcome.resumedFrom} from a previous run's checkpoint`)
  }
  lines.push("")
  for (const metric of ["activeEnergy", "stepCount"] as const) {
    const s = outcome.perMetric[metric]
    lines.push(
      `${metric.padEnd(14)} ${String(s.count).padStart(9)} records   earliest ${isoMinute(s.earliestMs)}   latest ${isoMinute(s.latestMs)}`
    )
  }
  lines.push("")
  lines.push(`record lines read   ${outcome.tally.recordLines}`)
  lines.push(`converted           ${outcome.tally.converted}`)
  if (outcome.tally.unparseable > 0) lines.push(`unparseable         ${outcome.tally.unparseable}`)
  if (outcome.tally.sourceDefaulted > 0) {
    lines.push(`no sourceName       ${outcome.tally.sourceDefaulted}  (stored under a placeholder)`)
  }
  for (const [reason, n] of Object.entries(outcome.tally.rejected)) {
    if (n > 0) lines.push(`refused (${reason})  ${n}`)
  }
  if (!dryRun) {
    lines.push("")
    lines.push(`batches written     ${outcome.batches}`)
    lines.push(`rows inserted       ${outcome.write.inserted}`)
    lines.push(`already stored      ${outcome.write.unchanged}`)
    if (outcome.write.valueChanged > 0) {
      lines.push(
        `value changed       ${outcome.write.valueChanged}  (a late correction, or two samples colliding on the key — worth a look)`
      )
    }
  }
  return `${lines.join("\n")}\n`
}

export default async function elaineHealthImport(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const path = parsed.string("--path")
  const since = parsed.string("--since")
  const batch = parsed.nonNegativeInt("--batch") ?? MAX_IMPORT_BATCH
  const dryRun = parsed.boolean("--dry-run")
  const restart = parsed.boolean("--restart")
  const json = parsed.boolean("--json")

  if (since !== undefined && !SINCE_DAY.test(since)) {
    throw inputError(`--since must be YYYY-MM-DD (got ${since})`)
  }
  if (batch < 1 || batch > MAX_IMPORT_BATCH) {
    throw inputError(`--batch must be between 1 and ${MAX_IMPORT_BATCH} (got ${batch})`)
  }

  const sinceDay = since ?? NO_LOWER_BOUND
  const script = buildFetchScript({
    path,
    sinceDay,
    metrics: IMPORT_METRICS,
  })
  const outcome = await runHealthImport(
    {
      sinceDay,
      batchSize: batch,
      dryRun,
      restart,
      onProgress: (p) => {
        process.stderr.write(
          `  batch ${p.batches}: ${p.samplesWritten} samples, ${p.recordLines} record lines read\n`
        )
      },
    },
    {
      openStream: () => streamSshLines(MACBOOK, script),
      writeBatch: async (batchSamples) => {
        if (dryRun) throw new Error("writeBatch reached on a dry run")
        return upsertHealthSamples({ samples: batchSamples })
      },
    }
  )

  if (outcome.sourceFile === null) {
    throw dataError(
      "no Apple Health export found on the macbook. From your iPhone Health app, tap your profile photo → " +
        "Export All Health Data, then AirDrop/save the zip to the Mac's ~/Downloads (or pass --path <file>)."
    )
  }

  const reading = importReading(outcome, { dryRun, observedAtMs: Date.now() })

  if (json) {
    process.stdout.write(`${JSON.stringify({ outcome, reading })}\n`)
    return
  }

  process.stderr.write(format(outcome, dryRun))
  emitReading(reading)
}
