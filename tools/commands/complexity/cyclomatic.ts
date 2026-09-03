export const summary = "Per-function McCabe cyclomatic complexity across the workspace"

import {
  collectCyclomaticRows,
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
      description: "Only print functions whose CC ≥ <n>.",
    },
    {
      name: "--top",
      argLabel: "<n>",
      valueShape: "token",
      description: "Print only the top <n> rows by CC, descending.",
    },
    { name: "--json", description: "Emit JSON instead of TSV." },
  ],
  examples: [
    "ops complexity cyclomatic",
    "ops complexity cyclomatic --top 20 --json",
    "ops complexity cyclomatic --file <path>",
  ],
}

export default async function complexityCyclomatic(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const fileFlag = parsed.string("--file")
  const threshold = parsed.nonNegativeInt("--threshold")
  const top = parsed.nonNegativeInt("--top")
  const json = parsed.boolean("--json")

  const inputs = resolveAnalysisInputs(fileFlag)
  let rows = collectCyclomaticRows(inputs).slice()
  rows.sort((a, b) => {
    const ccDelta = b.cc - a.cc
    if (ccDelta !== 0) return ccDelta
    const fileDelta = a.file.localeCompare(b.file)
    if (fileDelta !== 0) return fileDelta
    return a.line - b.line
  })
  if (threshold !== undefined) rows = rows.filter((r) => r.cc >= threshold)
  if (top !== undefined) rows = rows.slice(0, top)

  if (json) {
    process.stdout.write(`${JSON.stringify({ rows })}\n`)
    return
  }
  if (rows.length === 0) return
  const lines = rows.map((r) => `${r.file}\t${r.function}\t${r.line}\t${r.cc}`)
  process.stdout.write(`${lines.join("\n")}\n`)
}
