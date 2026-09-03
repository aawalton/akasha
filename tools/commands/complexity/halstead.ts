export const summary = "Per-function Halstead vocabulary metrics across the workspace"

import {
  collectHalsteadRows,
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
      description: "Only print functions whose Volume ≥ <n>.",
    },
    {
      name: "--top",
      argLabel: "<n>",
      valueShape: "token",
      description: "Print only the top <n> rows by Volume, descending.",
    },
    { name: "--json", description: "Emit JSON instead of TSV." },
  ],
  examples: [
    "ops complexity halstead",
    "ops complexity halstead --top 20 --json",
    "ops complexity halstead --file <path>",
  ],
}

function fmt(n: number): string {
  return n.toFixed(2)
}

export default async function complexityHalstead(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const fileFlag = parsed.string("--file")
  const threshold = parsed.nonNegativeInt("--threshold")
  const top = parsed.nonNegativeInt("--top")
  const json = parsed.boolean("--json")

  const inputs = resolveAnalysisInputs(fileFlag)
  let rows = collectHalsteadRows(inputs).slice()
  rows.sort((a, b) => {
    const volumeDelta = b.volume - a.volume
    if (volumeDelta !== 0) return volumeDelta
    const fileDelta = a.file.localeCompare(b.file)
    if (fileDelta !== 0) return fileDelta
    return a.line - b.line
  })
  if (threshold !== undefined) rows = rows.filter((r) => r.volume >= threshold)
  if (top !== undefined) rows = rows.slice(0, top)

  if (json) {
    process.stdout.write(`${JSON.stringify({ rows })}\n`)
    return
  }
  if (rows.length === 0) return
  const lines = rows.map(
    (r) =>
      `${r.file}\t${r.function}\t${r.line}\t${r.n1}\t${r.n2}\t${r.N1}\t${r.N2}\t${fmt(r.volume)}\t${fmt(r.difficulty)}\t${fmt(r.effort)}\t${fmt(r.time)}\t${fmt(r.bugs)}`
  )
  process.stdout.write(`${lines.join("\n")}\n`)
}
