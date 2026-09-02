export const summary =
  "Every file under `tools/` that reaches one of Alan's tracking days or session rows around `dayPlaceOf` — by naming a day page type and then taking a page-store verb, read or write, from `page-query-client.ts` or from a module one hop away that took one. Was three folders and five write verbs, which is why it had never reported a finding: `lib/daily-tracking`, `lib/surplus-fall` and `commands/food` were outside the population it called complete, `askComposed` and `askTaking` were not verbs it knew, and `commands/tracking/edit.ts` reaches a session row through `getPage` without importing the client at all. REFUSES on a finding, unlike its neighbours here: a reach around the funnel needs no reading to settle. While the migration is partly done one day is markdown and the next is akasha, so a reach that decides for itself writes a new day to the old place after that day has moved, and a read that decides for itself answers that a moved day is empty. Refuses where it could not look — no file found under `tools/`, or a folder it could not list, or a file it could not read — because a run that read nothing must not print like a run that found no bypass (--repo-root, --json)"

import { resolve } from "node:path"
import { dataError, operationalError } from "../../lib/exit.ts"
import { parseArgs } from "../../lib/parse-args.ts"
import type { AuditReading } from "../../lib/audit-reading.ts"
import { renderAuditReading, summarizeAudit } from "../../lib/audit-reading.ts"
import { codeRoot } from "../../lib/code-root.ts"
import {
  ALLOWED_TO_REACH,
  type Bypass,
  READ_VERBS,
  type Reading,
  readingOf,
  NAMES_THE_FUNNEL,
  SCAN_UNDER,
  WRITE_VERBS,
} from "../../lib/tracking-funnel.ts"
import type { CommandHelp } from "../../ops/surface.ts"

const SUBJECT = "reaches around the day-place funnel anywhere under tools/"

const MAX_REPORTED = 40

export const help: CommandHelp = {
  flags: [
    {
      name: "--repo-root",
      argLabel: "<path>",
      valueShape: "token",
      path: true,
      description:
        "Which checkout to read the tools tree from; defaults to $CODE_ROOT, else this repository",
    },
    {
      name: "--json",
      description: "Emit the audit as single-line JSON instead of the human report",
    },
  ],
  exits: [
    {
      code: 0,
      meaning: "every reach of a day or a session row under `tools/` goes through `dayPlaceOf`",
    },
    {
      code: 2,
      meaning:
        "one or more files reach around the funnel — a read or a write of a day that decides for itself where that day is kept",
    },
    {
      code: 3,
      meaning:
        "operational error — no file was found under `tools/`, or a folder could not be listed, or a file could not be read, so the population is short by an amount nobody knows and no coverage can be reported",
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
      `no TypeScript file was found under ${SCAN_UNDER}/ in ${repoRoot}, so nothing was weighed ` +
        "and a reach around the funnel could not have been seen. This is not a clean run. Name " +
        "the checkout with --repo-root, or repoint `SCAN_UNDER` in tools/lib/tracking-funnel.ts " +
        "at where the tools tree now sits."
    )
  }

  if (reading.unread.length > 0) {
    throw operationalError(
      `${String(reading.unread.length)} path(s) under ${SCAN_UNDER}/ were named and could not be ` +
        "read, so the population is short by an amount nobody knows and the count of reaches " +
        `below it is a floor rather than a census:\n` +
        reading.unread.map((one) => `    ${SCAN_UNDER}/${one.path} — ${one.why}`).join("\n") +
        "\nA scan that cannot see a folder must not report coverage over it. Make these readable, " +
        "or take them out of the tree."
    )
  }

  const audit = {
    reading: summarizeAudit({
      scanned: reading.scanned.length,
      compared: reading.weighed.length,
      findings: reading.bypasses.length,
      coverage: reading.coverage,
    }),
    repoRoot,
    scanUnder: SCAN_UNDER,
    allowed: ALLOWED_TO_REACH,
    readVerbs: READ_VERBS,
    writeVerbs: WRITE_VERBS,
    scanned: reading.scanned.length,
    weighed: reading.weighed.length,
    reachers: reading.reachers.length,
    unread: reading.unread,
    coverage: reading.coverage,
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
    `${String(placesOf(reading.bypasses).length)} file(s) under ${SCAN_UNDER}/ reach around ` +
      `tools/${NAMES_THE_FUNNEL}, the one thing that says where a day is kept. Land the write or ` +
      "ask the read through it, or say here why this reach is one the funnel does not govern by " +
      "naming the file in `ALLOWED_TO_REACH` in tools/lib/tracking-funnel.ts."
  )
}

function placesOf(bypasses: readonly Bypass[]): readonly string[] {
  return [...new Set(bypasses.map((one) => one.path))].sort()
}

function at(one: Bypass): string {
  return one.at.length === 0 ? String(one.line) : one.at.join(",")
}

function hopsSaid(hops: number): string {
  return hops === 1 ? "one hop" : `${String(hops)} hops`
}

function lined(reading: Reading, said: AuditReading): readonly string[] {
  const scanned = reading.scanned.length
  const weighed = reading.weighed.length
  const lines = [...renderAuditReading(SUBJECT, said)]
  lines.push(`  POPULATION: ${String(scanned)} TypeScript file(s) under ${SCAN_UNDER}/.`)
  lines.push(
    `  DENOMINATOR: ${String(weighed)} weighed, after ${String(scanned - weighed)} test and ` +
      "declaration file(s) set aside, which state the rule rather than being bound by it."
  )
  lines.push(
    `  OF THOSE: ${String(reading.namers.length)} name a day page type, and ` +
      `${String(reading.reachers.length)} can reach the page store — by one of its four roads, or ` +
      `through a module that took one, ${hopsSaid(reading.hops)} deep at the furthest. Both are ` +
      "needed for a finding, so the reaches below are counted against the first of those numbers."
  )
  if (reading.bypasses.length === 0) {
    lines.push(
      `    Every reach of a day goes through tools/${NAMES_THE_FUNNEL}, and no file under ` +
        `${SCAN_UNDER}/ that touches the page store names a day page type of its own.`
    )
    return lines
  }
  const places = placesOf(reading.bypasses)
  lines.push(
    `  AROUND THE FUNNEL: ${String(places.length)} file(s) of the ${String(reading.namers.length)} ` +
      `that name a day, carrying ${String(reading.bypasses.length)} reach(es).`
  )
  for (const one of reading.bypasses.slice(0, MAX_REPORTED)) {
    lines.push(`    [${one.kind}] tools/${one.path}:${at(one)} — ${one.reason}`)
  }
  if (reading.bypasses.length > MAX_REPORTED) {
    const rest = reading.bypasses.length - MAX_REPORTED
    lines.push(`    and ${String(rest)} more, not listed; --json carries every one`)
  }
  return lines
}
