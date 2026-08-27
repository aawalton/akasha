
export const summary = "Pre-session coaching digest over pages: equipment, per-movement last/best/target, last session, mobility + trend, constraints (--focus defaults to today's scheduled focus)"

import { normalizeSelectValue } from "@collections/exercises/cli/select-values"
import { loadDigest } from "@collections/exercises/tracking/digest"
import type { SetLine } from "@collections/exercises/tracking/history-core"
import type { CommandHelp } from "../../ops/surface.ts"
import { readBodyweight } from "../../lib/exercise-pages.ts"
import { parseArgs } from "../../lib/parse-args.ts"
import { FOCUS_OPTIONS } from "../../lib/exercise-vocabularies.ts"

export const help: CommandHelp = {
  flags: [
    {
      name: "--focus",
      argLabel: `<${FOCUS_OPTIONS.join("|")}>`,
      valueShape: "token",
      description: "Focus to brief (default: today's scheduled focus)",
    },
    { name: "--json", description: "Emit the full digest as a JSON envelope" },
  ],
  exits: [
    { code: 0, meaning: "digest printed" },
    { code: 1, meaning: "bad input or query failure" },
  ],
  examples: [
    "ops exercise digest",
    "ops exercise digest --focus push",
    "ops exercise digest --json",
  ],
}

function setLineStr(line: SetLine | null): string {
  if (line === null) return "-"
  const weight = line.weight ?? "-"
  const reps = line.reps ?? "-"
  const date = line.date ?? "-"
  return `${weight}×${reps} (${date})`
}

export default async function exerciseDigest(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)

  const focusRaw = parsed.string("--focus")
  const focus =
    focusRaw !== undefined ? normalizeSelectValue(focusRaw, FOCUS_OPTIONS, "--focus") : undefined
  const json = parsed.boolean("--json")

  const digest = await loadDigest(focus, new Date(), readBodyweight())

  if (json) {
    process.stdout.write(`${JSON.stringify(digest)}\n`)
    return
  }

  let out = ""
  out += `date\t${digest.date}\n`
  out += `focus\t${digest.focus ?? "(none scheduled)"}\n`
  out += `bodyweight\t${digest.bodyweight}\n`

  out += "\n# last trained by focus\n"
  for (const r of digest.lastTrainedByFocus) out += `${r.focus}\t${r.lastTrained ?? "never"}\n`

  out += "\n# equipment\n"
  for (const e of digest.equipment) {
    const avail = e.available ? "" : "\t(proposed)"
    out += `${e.title}\t${e.category ?? "-"}\t${e.configuration ?? "-"}\t${e.loads ?? "-"}${avail}\n`
  }

  out += "\n# movements\n"
  for (const m of digest.movements) {
    out += `${m.name}\tlast ${setLineStr(m.last)}\tbest ${setLineStr(m.best)}\ttarget ${m.target ?? "-"}\n`
  }

  out += "\n# last session\n"
  if (digest.lastSession !== null) {
    out += `${digest.lastSession.date ?? "-"}\tvolume ${digest.lastSession.totalVolume}\t${digest.lastSession.movements.join(", ")}\n`
  } else {
    out += "(no logged session for this focus)\n"
  }

  out += "\n# mobility\n"
  for (const mob of digest.mobility) {
    const side = mob.side !== null ? ` (${mob.side})` : ""
    out += `${mob.metric}${side}\t${mob.latestText ?? "-"}\t${mob.latestNum ?? "-"}\t${mob.trend}\t${mob.date ?? "-"}\n`
  }

  out += "\n# constraints\n"
  for (const c of digest.constraints) {
    const tags = c.focusTags.length > 0 ? c.focusTags.join(",") : "-"
    out += `${c.kind ?? "-"}\t${tags}\t${c.title}\n`
  }

  process.stdout.write(out)
}
