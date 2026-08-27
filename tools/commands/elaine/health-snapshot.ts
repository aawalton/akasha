
export const summary = "Read a current Apple Health snapshot (HRV, resting HR, SpO2, sleep, steps) off the macbook on demand"

import { fetchHealthExport } from "@alanwalton/elaine-cli/lib/remote"
import {
  formatSnapshot,
  SNAPSHOT_METRICS,
  summarizeSnapshot,
} from "@alanwalton/elaine-cli/lib/snapshot"
import type { CommandHelp } from "../../ops/surface.ts"
import { dataError, inputError } from "../../lib/exit.ts"
import { parseArgs } from "../../lib/parse-args.ts"

export const help: CommandHelp = {
  flags: [
    {
      name: "--days",
      argLabel: "<n>",
      valueShape: "token",
      default: "14",
      description: "Trailing window (days) for the latest reading and trend",
    },
    {
      name: "--path",
      argLabel: "<file>",
      valueShape: "token",
      description:
        "Explicit macbook path to an export .zip or an extracted export.xml (overrides the default scan)",
    },
    { name: "--json", description: "Emit the structured snapshot as JSON" },
  ],
  exits: [
    { code: 1, meaning: "input error: --days not a positive integer" },
    { code: 2, meaning: "data error: no Apple Health export found on the macbook" },
    { code: 3, meaning: "operational error: ssh against the macbook failed" },
  ],
  examples: [
    "ops elaine health-snapshot",
    "ops elaine health-snapshot --days 30",
    "ops elaine health-snapshot --path '~/Downloads/export.zip' --json",
  ],
}

function sinceDay(days: number, nowMs: number): string {
  return new Date(nowMs - (days + 1) * 86_400_000).toISOString().slice(0, 10)
}

export default async function elaineHealthSnapshot(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const days = parsed.nonNegativeInt("--days") ?? 14
  if (days === 0) throw inputError("--days must be a positive integer (got 0)")
  const path = parsed.string("--path")
  const json = parsed.boolean("--json")

  const nowMs = Date.now()
  const exported = await fetchHealthExport({
    path,
    sinceDay: sinceDay(days, nowMs),
    metrics: SNAPSHOT_METRICS,
  })
  if (exported.sourceFile === null) {
    throw dataError(
      "no Apple Health export found on the macbook. From your iPhone Health app, tap your profile photo → " +
        "Export All Health Data, then AirDrop/save the zip to the Mac's ~/Downloads (or pass --path <file>)."
    )
  }

  const snapshot = summarizeSnapshot(exported, days, nowMs)
  if (json) {
    process.stdout.write(`${JSON.stringify(snapshot)}\n`)
    return
  }
  process.stdout.write(formatSnapshot(snapshot))
}
