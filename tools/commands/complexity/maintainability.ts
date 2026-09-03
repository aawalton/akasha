export const summary = "Per-file Maintainability Index across the workspace"

import {
  collectMaintainabilityRows,
  resolveAnalysisInputs,
} from "@akasha/analysis-complexity/complexity-rows"
import { parseArgs } from "../../lib/parse-args.ts"
import type { CommandHelp } from "../../ops/surface.ts"

export const help: CommandHelp = {
  flags: [
    {
      name: "--file",
      argLabel: "<path>",
      valueShape: "token",
      description: "Restrict analysis to one repo-relative file path.",
    },
    {
      name: "--threshold",
      argLabel: "<n>",
      valueShape: "token",
      description: "Only print files whose MI ≤ <n> (lower MI = harder to maintain).",
    },
    {
      name: "--top",
      argLabel: "<n>",
      valueShape: "token",
      description: "Print only the top <n> rows by lowest MI.",
    },
    { name: "--json", description: "Emit JSON instead of TSV." },
  ],
  examples: [
    "ops complexity maintainability",
    "ops complexity maintainability --top 20 --json",
    "ops complexity maintainability --file <path>",
  ],
}

export default async function complexityMaintainability(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const fileFlag = parsed.string("--file")
  const threshold = parsed.nonNegativeInt("--threshold")
  const top = parsed.nonNegativeInt("--top")
  const json = parsed.boolean("--json")

  const inputs = resolveAnalysisInputs(fileFlag)
  let rows = collectMaintainabilityRows(inputs).slice()
  rows.sort((a, b) => {
    const miDelta = a.mi - b.mi
    if (miDelta !== 0) return miDelta
    return a.file.localeCompare(b.file)
  })
  if (threshold !== undefined) rows = rows.filter((r) => r.mi <= threshold)
  if (top !== undefined) rows = rows.slice(0, top)

  if (json) {
    process.stdout.write(`${JSON.stringify({ rows })}\n`)
    return
  }
  if (rows.length === 0) return
  const lines = rows.map(
    (r) => `${r.file}\t${r.mi.toFixed(1)}\t${r.sloc}\t${r.ccSum}\t${r.volumeSum.toFixed(2)}`
  )
  process.stdout.write(`${lines.join("\n")}\n`)
}
