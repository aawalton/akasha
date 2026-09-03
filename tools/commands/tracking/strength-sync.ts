export const summary =
  "Recompute a day's strengthVolume from workout-session volume (total lb lifted)"

import type { CommandHelp } from "@akasha/command-system/command-declaring"
import { getEsoDayStr } from "../../lib/eso-day.ts"
import { inputError } from "../../lib/exit.ts"
import { parseArgs } from "../../lib/parse-args.ts"
import { strengthPoints } from "../../lib/tracking-pillars.ts"

const DAY_RE = /^\d{4}-\d{2}-\d{2}$/

export const help: CommandHelp = {
  flags: [
    {
      name: "--date",
      argLabel: "<YYYY-MM-DD>",
      valueShape: "token",
      description: "ESO day to recompute (default today)",
    },
    { name: "--json", description: "Emit a JSON envelope instead of TSV lines" },
  ],
  exits: [
    { code: 0, meaning: "strengthVolume recomputed and written" },
    { code: 1, meaning: "bad --date" },
  ],
  examples: ["ops tracking strength-sync", "ops tracking strength-sync --date 2026-06-18"],
}

export default async function trackingStrengthSync(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const json = parsed.boolean("--json")

  const dateRaw = parsed.string("--date")
  if (dateRaw !== undefined && !DAY_RE.test(dateRaw)) {
    throw inputError(`--date must be YYYY-MM-DD (got "${dateRaw}")`)
  }
  const dayStr = dateRaw ?? getEsoDayStr(new Date())

  const { rollupStrengthForDay } = await strengthPoints()

  console.error(`Recomputing strengthVolume for ${dayStr} from workout-session volume…`)
  const { strengthVolume, outcome } = await rollupStrengthForDay(dayStr)

  if (json) {
    process.stdout.write(`${JSON.stringify({ day: dayStr, strengthVolume, outcome })}\n`)
    return
  }
  process.stdout.write(`day\t${dayStr}\nstrengthVolume\t${strengthVolume}\noutcome\t${outcome}\n`)
}
