export const summary =
  "Every entry in `RECOVERY_RATES` that Alan's own notes on his recovery never name — a rate crediting capacity-hours to his ledger with no basis in his record of his own body. Was `check-recovery-rate-notes-coverage`, whose evidence is one file in the BOOKS repository: the rate table it judged sits in the code repo, but the text it judged the table against does not, so a books commit moved a code-repo verdict with no diff near the cause. That is not hypothetical — `21aee47` there renamed the file into `chapters/`, and the check has refused to run ever since. Reports and never refuses on a finding: an unnamed rate may want the note written or may want the rate dropped, and only a reading tells which. Refuses where it could not look at all — no books checkout, no notes file, or a notes file that reads empty — because a run that read nothing must not print like a run that found every rate documented. Names a MISSING ENTRY only; it never compares the numbers, which no automatic reading of prose could settle (--books-root, --json)"

import { existsSync } from "node:fs"
import { join } from "node:path"
import { booksRoot } from "../../lib/book-of-everything-root.ts"
import {
  findUndocumentedRecoveryRates,
  NotesTextSchema,
  RECOVERY_RATES,
} from "../../lib/daily-tracking/recovery-rates.ts"
import { operationalError } from "../../lib/exit.ts"
import { parseArgs } from "../../lib/parse-args.ts"
import { renderAuditReading, summarizeAudit } from "../../lib/audit-reading.ts"
import type { CommandHelp } from "../../ops/surface.ts"

const SUBJECT = "each recovery rate against Alan's own notes on his recovery"

const NOTES_NAME = "recovery-rates.md"
const NOTES_PATH = `all-about-alan/chapters/notes/${NOTES_NAME}`

export const help: CommandHelp = {
  flags: [
    {
      name: "--books-root",
      argLabel: "<path>",
      valueShape: "token",
      description: "Which books checkout to read the notes from; defaults to $BOOKS_ROOT or $HOME/repos/books",
    },
    {
      name: "--json",
      description: "Emit the audit as single-line JSON instead of the human report",
    },
  ],
  exits: [
    { code: 0, meaning: "the audit ran and printed its reading, undocumented rates or none" },
    {
      code: 3,
      meaning:
        "operational error — no books checkout, no notes file, or a notes file that read empty, so nothing was weighed",
    },
  ],
  examples: ["ops audit recovery-rate-notes", "ops audit recovery-rate-notes --json"],
}

type Located = { readonly rel: string } | { readonly candidates: readonly string[] }

function locateNotes(root: string): Located {
  if (existsSync(join(root, NOTES_PATH))) return { rel: NOTES_PATH }
  const candidates = [...new Bun.Glob(`**/${NOTES_NAME}`).scanSync({ cwd: root })].sort()
  const only = candidates.length === 1 ? candidates[0] : undefined
  return only === undefined ? { candidates } : { rel: only }
}

export default async function auditRecoveryRateNotes(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)

  const root = parsed.string("--books-root") ?? booksRoot()

  if (!existsSync(root)) {
    throw operationalError(
      `no books checkout at ${root}, and that one file is the whole evidence, so no rate could be weighed`
    )
  }

  const located = locateNotes(root)
  if ("candidates" in located) {
    throw operationalError(
      located.candidates.length === 0
        ? `${NOTES_PATH} is not under ${root} and no file named ${NOTES_NAME} stands anywhere in that tree`
        : `${NOTES_PATH} is not under ${root}, and ${String(located.candidates.length)} files named ` +
          `${NOTES_NAME} stand there (${located.candidates.join(", ")}) — which of them is Alan's record cannot be guessed`
    )
  }

  let notesText: string
  try {
    notesText = NotesTextSchema.parse(await Bun.file(join(root, located.rel)).text())
  } catch {
    throw operationalError(
      `${located.rel} under ${root} read as empty — an unopened notes file is not one in which every rate happens to be named`
    )
  }

  const undocumented = findUndocumentedRecoveryRates({
    rates: RECOVERY_RATES,
    notesText,
  })

  const audit = {
    reading: summarizeAudit({
      scanned: RECOVERY_RATES.length,
      compared: RECOVERY_RATES.length,
      findings: undocumented.length,
      coverage: "complete" as const,
    }),
    notesRoot: root,
    notesPath: located.rel,
    undocumented: undocumented.map((v) => ({ token: v.token, message: v.message })),
    observedAtMs: Date.now(),
  }

  if (parsed.boolean("--json")) {
    process.stdout.write(`${JSON.stringify(audit)}\n`)
    return
  }

  const lines = [...renderAuditReading(SUBJECT, audit.reading)]
  lines.push(`  read ${audit.notesPath} under ${audit.notesRoot}`)
  if (audit.notesPath !== NOTES_PATH) {
    lines.push(
      `  That is not ${NOTES_PATH}, where this command expects it. The notes moved and were`,
      "  found by name; the expected path here is stale and wants correcting."
    )
  }
  for (const entry of audit.undocumented) lines.push(`  ${entry.message}`)
  if (audit.undocumented.length > 0) {
    lines.push(
      `  Either write the activity into ${audit.notesPath}, or drop the rate from RECOVERY_RATES`,
      "  in tools/lib/daily-tracking/recovery-rates.ts. The notes are Alan's",
      "  own record of his body — write what he has said about the activity, never an invented rate."
    )
  }
  process.stdout.write(`${lines.join("\n")}\n`)
}
