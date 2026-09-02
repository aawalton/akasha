export const summary =
  "Every file under `tools/lib/tracking`, `tools/commands/tracking` or `tools/lib/inbox-tracking` that reaches around `dayPlaceOf` — either by taking a page-store write verb from `page-query-client.ts`, or by spelling a day page type itself and so deciding for itself where a day is kept. Was two static tests inside `tools/lib/tracking/day-place.test.ts`, which asserted the same two rules over the same three folders but only bound whoever remembered to run that file; nothing runs the tests under `tools/`. REFUSES on a finding, unlike its neighbours here: a reach around the funnel needs no reading to settle. While the migration is partly done one day is markdown and the next is akasha, so a reach that decides for itself writes a new day to the old place after that day has moved, leaving two files for one day each holding half of it. Refuses where it could not look — no file found under the funnel folders — because a run that read nothing must not print like a run that found no bypass (--repo-root, --json)"

import { resolve } from "node:path"
import { dataError, operationalError } from "../../lib/exit.ts"
import { parseArgs } from "../../lib/parse-args.ts"
import type { AuditReading } from "../../lib/audit-reading.ts"
import { renderAuditReading, summarizeAudit } from "../../lib/audit-reading.ts"
import { codeRoot } from "../../lib/code-root.ts"
import {
  ALLOWED_TO_REACH,
  FUNNEL_DIRS,
  NAMES_THE_FUNNEL,
  type Reading,
  readingOf,
} from "../../lib/tracking-funnel.ts"
import type { CommandHelp } from "../../ops/surface.ts"

const SUBJECT = "reaches around the day-place funnel under the tracking folders"

const MAX_REPORTED = 20

export const help: CommandHelp = {
  flags: [
    {
      name: "--repo-root",
      argLabel: "<path>",
      valueShape: "token",
      path: true,
      description:
        "Which checkout to read the tracking folders from; defaults to $CODE_ROOT, else this repository",
    },
    {
      name: "--json",
      description: "Emit the audit as single-line JSON instead of the human report",
    },
  ],
  exits: [
    { code: 0, meaning: "every file under the funnel folders goes through `dayPlaceOf`" },
    {
      code: 2,
      meaning:
        "one or more files reach around the funnel — a write of a day that decides for itself where that day is kept",
    },
    {
      code: 3,
      meaning:
        "operational error — no file was found under the funnel folders, so nothing was weighed and no bypass could have been seen",
    },
  ],
  examples: [
    "ops audit tracking-funnel",
    "ops audit tracking-funnel --repo-root ~/repos/akasha --json",
  ],
}

export default function auditTrackingFunnel(args: readonly string[]): void {
  const parsed = parseArgs(help, args)

  const stated = parsed.string("--repo-root")
  const repoRoot = stated === undefined ? codeRoot() : resolve(stated)

  const reading = readingOf(repoRoot)

  if (reading.scanned.length === 0) {
    throw operationalError(
      `no TypeScript file was found under ${FUNNEL_DIRS.map((one) => `tools/${one}`).join(", ")} ` +
        `in ${repoRoot}, so nothing was weighed and a reach around the funnel could not have ` +
        "been seen. This is not a clean run. Name the checkout with --repo-root, or repoint " +
        "`FUNNEL_DIRS` in tools/lib/tracking-funnel.ts at where the tracking folders now sit."
    )
  }

  const audit = {
    reading: summarizeAudit({
      scanned: reading.scanned.length,
      compared: reading.weighed.length,
      findings: reading.bypasses.length,
      coverage: "complete" as const,
    }),
    repoRoot,
    dirs: FUNNEL_DIRS,
    allowed: ALLOWED_TO_REACH,
    scanned: reading.scanned.length,
    weighed: reading.weighed.length,
    bypasses: reading.bypasses,
    observedAtMs: Date.now(),
  }

  if (parsed.boolean("--json")) {
    process.stdout.write(`${JSON.stringify(audit)}\n`)
  } else {
    process.stdout.write(`${lined(reading, audit.reading).join("\n")}\n`)
  }

  if (reading.bypasses.length === 0) return

  throw dataError(
    `${reading.bypasses.length} file(s) under the tracking folders reach around ` +
      `tools/${NAMES_THE_FUNNEL}, the one thing that says where a day is kept. Land the write ` +
      "through it, or say here why this reach is one the funnel does not govern by naming the " +
      "file in `ALLOWED_TO_REACH` in tools/lib/tracking-funnel.ts."
  )
}

function lined(reading: Reading, said: AuditReading): readonly string[] {
  const scanned = reading.scanned.length
  const weighed = reading.weighed.length
  const lines = [...renderAuditReading(SUBJECT, said)]
  lines.push(
    `  POPULATION: ${String(scanned)} TypeScript file(s) under ` +
      `${FUNNEL_DIRS.map((one) => `tools/${one}`).join(", ")}.`
  )
  lines.push(
    `  DENOMINATOR: ${String(weighed)} weighed, after ${String(scanned - weighed)} test file(s) ` +
      "set aside, which state the rule rather than being bound by it."
  )
  if (reading.bypasses.length === 0) {
    lines.push(
      `    Every write of a day goes through tools/${NAMES_THE_FUNNEL}, and no other file names ` +
        "a day page type."
    )
    return lines
  }
  lines.push(
    `  AROUND THE FUNNEL: ${String(reading.bypasses.length)} of ${String(weighed)} weighed.`
  )
  for (const one of reading.bypasses.slice(0, MAX_REPORTED)) {
    lines.push(`    tools/${one.path} — ${one.reason}`)
  }
  if (reading.bypasses.length > MAX_REPORTED) {
    const rest = reading.bypasses.length - MAX_REPORTED
    lines.push(`    and ${String(rest)} more, not listed; --json carries every one`)
  }
  return lines
}
