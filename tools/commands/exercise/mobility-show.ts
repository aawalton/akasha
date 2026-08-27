
export const summary = "Show recent mobility readings + trend per metric+side"

import { fieldNum, fieldStr } from "@collections/exercises/cli/fields"
import { normalizeSelectValue } from "@collections/exercises/cli/select-values"
import { getPages } from "@collections/exercises/pages/access"
import { mobilityTrend } from "@collections/exercises/tracking/digest-model"
import type { CommandHelp } from "../../ops/surface.ts"
import { parseArgs } from "../../lib/parse-args.ts"
import { MOBILITY_METRIC_OPTIONS } from "../../lib/exercise-vocabularies.ts"

export const help: CommandHelp = {
  flags: [
    {
      name: "--metric",
      argLabel: `<${MOBILITY_METRIC_OPTIONS.join("|")}>`,
      valueShape: "token",
      description: "Filter to a single metric (default: all)",
    },
    {
      name: "--limit",
      argLabel: "<n>",
      valueShape: "token",
      default: "30",
      description: "Max readings fetched",
      aliases: ["--tail"],
    },
    { name: "--json", description: "Emit a JSON envelope instead of TSV lines" },
  ],
  exits: [
    { code: 0, meaning: "readings printed" },
    { code: 1, meaning: "bad input or query failure" },
  ],
  examples: ["ops exercise mobility-show", "ops exercise mobility-show --metric supine-slr --json"],
}

export default async function exerciseMobilityShow(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)

  const metricRaw = parsed.string("--metric")
  const metric =
    metricRaw !== undefined
      ? normalizeSelectValue(metricRaw, MOBILITY_METRIC_OPTIONS, "--metric")
      : undefined
  const limit = parsed.nonNegativeInt("--limit") ?? 30
  const json = parsed.boolean("--json")

  const rows = await getPages({
    pageTypeSlug: "mobility-reading",
    where: metric !== undefined ? [{ key: "metric", eq: metric }] : [],
    order: [{ by: "date", dir: "desc" }],
    limit,
  })
  const readings = rows.rows.map((row) => ({
    metric: fieldStr(row, "metric") ?? "-",
    date: fieldStr(row, "date") ?? null,
    side: fieldStr(row, "side") ?? null,
    context: fieldStr(row, "context") ?? null,
    valueText: fieldStr(row, "valueText") ?? null,
    valueNum: fieldNum(row, "valueNum") ?? null,
  }))

  const trends = new Map<string, ReturnType<typeof mobilityTrend>>()
  const numsByKey = new Map<string, number[]>()
  for (const r of [...readings].reverse()) {
    if (r.valueNum === null) continue
    const key = `${r.metric}::${r.side ?? ""}`
    const arr = numsByKey.get(key) ?? []
    arr.push(r.valueNum)
    numsByKey.set(key, arr)
  }
  for (const [key, nums] of numsByKey) trends.set(key, mobilityTrend(nums))

  if (json) {
    process.stdout.write(`${JSON.stringify({ readings, trends: Object.fromEntries(trends) })}\n`)
    return
  }
  let out = ""
  for (const r of readings) {
    out += `${r.date ?? "-"}\t${r.metric}\t${r.side ?? "-"}\t${r.context ?? "-"}\t${r.valueText ?? "-"}\t${r.valueNum ?? "-"}\n`
  }
  for (const [key, trend] of trends) out += `trend\t${key}\t${trend}\n`
  process.stdout.write(out === "" ? "(no mobility readings)\n" : out)
}
