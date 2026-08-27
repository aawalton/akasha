
export const summary = "Append a mobility/baseline reading (time-series, optional numeric trend value)"

import { parseDecimalFlag } from "@collections/exercises/cli/fields"
import { normalizeSelectValue } from "@collections/exercises/cli/select-values"
import { z } from "zod"
import type { CommandHelp } from "../../ops/surface.ts"
import { getEsoDayStr } from "../../lib/eso-day.ts"
import { writePage } from "../../lib/page-write.ts"
import { resolveRoots } from "../../../repo/roots/roots"
import { parseArgs } from "../../lib/parse-args.ts"
import {
  MOBILITY_CONTEXT_OPTIONS,
  MOBILITY_METRIC_OPTIONS,
  MOBILITY_SIDE_OPTIONS,
} from "../../lib/exercise-vocabularies.ts"

export const help: CommandHelp = {
  flags: [
    {
      name: "--metric",
      argLabel: `<${MOBILITY_METRIC_OPTIONS.join("|")}>`,
      valueShape: "token",
      required: true,
      description: "Mobility metric",
    },
    {
      name: "--value",
      argLabel: "<text>",
      valueShape: "prose",
      required: true,
      description: "Human read (e.g. 'mid-shin → 3/4 down')",
    },
    {
      name: "--num",
      argLabel: "<n>",
      valueShape: "token",
      description: "Optional numeric value for the trend line",
    },
    {
      name: "--side",
      argLabel: `<${MOBILITY_SIDE_OPTIONS.join("|")}>`,
      valueShape: "token",
      default: "n-a",
      description: "Side (left / right / n-a)",
    },
    {
      name: "--context",
      argLabel: `<${MOBILITY_CONTEXT_OPTIONS.join("|")}>`,
      valueShape: "token",
      default: "standalone",
      description: "When measured (warmup / cooldown / standalone)",
    },
    {
      name: "--date",
      argLabel: "<YYYY-MM-DD>",
      valueShape: "token",
      description: "Reading date (default: today by ESO day)",
    },
    { name: "--note", argLabel: "<text>", valueShape: "prose", description: "Free-text note" },
    { name: "--json", description: "Emit a JSON envelope instead of TSV lines" },
  ],
  exits: [
    { code: 0, meaning: "reading logged" },
    { code: 1, meaning: "bad input or write failure" },
  ],
  examples: [
    "ops exercise mobility-log --metric forward-fold --value-file ./value.txt --context warmup",
    "ops exercise mobility-log --metric supine-slr --side right --value-file ./value.txt --num 50",
  ],
}

export default async function exerciseMobilityLog(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)

  const dayStrSchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "expected YYYY-MM-DD")

  const metric = normalizeSelectValue(
    parsed.requireString("--metric"),
    MOBILITY_METRIC_OPTIONS,
    "--metric"
  )
  const valueText = parsed.requireString("--value")
  const valueNum = parseDecimalFlag("--num", parsed.string("--num"))
  const side = normalizeSelectValue(
    parsed.string("--side") ?? "n-a",
    MOBILITY_SIDE_OPTIONS,
    "--side"
  )
  const context = normalizeSelectValue(
    parsed.string("--context") ?? "standalone",
    MOBILITY_CONTEXT_OPTIONS,
    "--context"
  )
  const dateFlag = parsed.string("--date")
  const date = dateFlag !== undefined ? dayStrSchema.parse(dateFlag) : getEsoDayStr(new Date())
  const note = parsed.string("--note")
  const json = parsed.boolean("--json")

  const sideSuffix = side !== "n-a" ? ` (${side})` : ""
  const values: Record<string, string | number> = {
    title: `${metric} ${date}${sideSuffix}`,
    metric,
    date,
    "value-text": valueText,
    side,
    context,
    ...(valueNum !== undefined ? { "value-num": valueNum } : {}),
    ...(note !== undefined ? { note } : {}),
  }
  const name = `${metric}-${date}${side !== "n-a" ? `-${side}` : ""}`
  const written = writePage(resolveRoots(), "mobility-reading", name, values, "ops exercise mobility-log")
  if (written === null) {
    throw new Error("`mobility-reading` names no page type whose pages are files")
  }
  if (written.commitError !== null) throw new Error(written.commitError)

  if (json) {
    process.stdout.write(
      `${JSON.stringify({ path: written.relPath, metric, date, side, valueText, valueNum: valueNum ?? null })}\n`
    )
    return
  }
  process.stdout.write(
    `path\t${written.relPath}\nmetric\t${metric}\ndate\t${date}\nside\t${side}\nvalue\t${valueText}\nnum\t${valueNum ?? "-"}\n`
  )
}
