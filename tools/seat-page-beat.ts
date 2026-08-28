/**
 * A seat page write, run as a process of its own.
 *
 * WHY THIS IS A PROCESS AND NOT A FUNCTION. A supervisor outlives every write it makes, and Bun
 * resolves a module once at process start, so whatever a supervisor imports is frozen at the
 * moment it booted. A composer corrected on disk stays inert in every running supervisor while
 * the frozen copy goes on undoing the correction at the next beat: `e951e30f8` gave every seat
 * page its `slug:` at 18:39:19 and `dd96cd8b6` stripped it back off twenty-three seconds later,
 * that one line its whole diff, under this writer's own commit message. The one seat with no
 * supervisor was the one seat that kept it.
 *
 * So a supervisor holds an agent id and a verb, and nothing else. Everything that decides what a
 * seat page says is read from disk here, on the call, which puts a correction into the next beat
 * and leaves staleness as nothing anyone has to detect.
 *
 * NOTHING A SUPERVISOR IMPORTS MAY BE ADDED TO THIS FILE'S CALLERS. What the caller keeps is a
 * path and an argument list; every judgement belongs on this side of the spawn, or it is frozen
 * again and this file has bought nothing.
 */

import { resolveRoots } from "../repo/roots/roots.ts"
import { fail } from "./lib/command.ts"
import { type Outcome } from "./lib/gated-write.ts"
import { nameFromHistory, parentFromHistory } from "./lib/seat-page-history.ts"
import { removeSeatPage, writeSeatPage } from "./lib/seat-page.ts"
import { composedNameOf } from "./lib/seat-rename.ts"
import { rotatedOf } from "./lib/seat-rotated-session.ts"
import { sessionRecordOf } from "./lib/seat-session.ts"
import { type Stated, fallBackToHistory, statedOf } from "./lib/seat-stated.ts"
import { transcriptRecordOf } from "./lib/seat-transcript-path.ts"

/** What the caller reads back: the outcome, and the name this resolved, for the caller's log. */
export interface BeatReport {
  readonly outcome: Outcome
  readonly seat: string | null
}

function valueOf(argv: readonly string[], flag: string): string | null {
  const at = argv.indexOf(flag)
  if (at === -1) return null
  const value = argv[at + 1]
  if (value === undefined) fail(`${flag} takes a value`)
  return value
}

/**
 * The seat's stated attributes, with the session the running supervisor holds laid over them.
 *
 * THE SUPERVISOR HANDS OVER ITS STATE AND NONE OF THE JUDGEMENT. Which agent a supervisor is
 * running and which session it has open are the only two facts no file on disk holds, so they
 * cross the spawn as they stand and are weighed here. A supervisor that decided this for itself
 * would freeze the decision, which is what this file exists to stop.
 *
 * The session applies only where the supervisor is running THIS seat: a supervisor running some
 * other agent has a session belonging to that one, and laying it over this page would hand a
 * seat another seat's session.
 */
export function statedForPage(
  agentId: string,
  account: string | null = null,
  selfHealAgent: string | null = null,
  selfHealSession: string | null = null
): Stated {
  const read = statedOf(agentId)
  const stood = account === null ? read : { ...read, registration: { value: account } }
  if (selfHealAgent !== agentId) return stood
  const running = sessionRecordOf(selfHealSession)
  return running === null ? stood : { ...stood, session: running }
}

export function beat(argv: readonly string[]): BeatReport {
  const agentId = valueOf(argv, "--agent")
  if (agentId === null) fail("--agent names the seat this writes for")

  const stopReason = valueOf(argv, "--remove")
  if (stopReason !== null) return { outcome: removeSeatPage(agentId, stopReason), seat: null }

  const roots = resolveRoots()
  const seat = composedNameOf(agentId) ?? nameFromHistory(agentId, roots)
  if (seat === null) return { outcome: { kind: "unchanged" }, seat: null }

  const sessionId = valueOf(argv, "--session")
  if (sessionId !== null) {
    const running = sessionRecordOf(sessionId)
    if (running === null) return { outcome: { kind: "unchanged" }, seat }
    return { outcome: writeSeatPage({ ...statedOf(agentId), session: running }, seat), seat }
  }

  const transcriptPath = valueOf(argv, "--transcript")
  if (transcriptPath !== null) {
    const watching = transcriptRecordOf(transcriptPath)
    if (watching === null) return { outcome: { kind: "unchanged" }, seat }
    return { outcome: writeSeatPage({ ...statedOf(agentId), transcript: watching }, seat), seat }
  }

  if (argv.includes("--clear-rotation")) {
    if (rotatedOf(agentId) === null) return { outcome: { kind: "unchanged" }, seat }
    return { outcome: writeSeatPage({ ...statedOf(agentId), rotated: null }, seat), seat }
  }

  const stated = fallBackToHistory(
    statedForPage(
      agentId,
      valueOf(argv, "--account"),
      valueOf(argv, "--self-heal-agent"),
      valueOf(argv, "--self-heal-session")
    ),
    seat,
    roots
  )
  const outcome = writeSeatPage(stated, seat)
  if (outcome.kind !== "unstated") return { outcome, seat }
  // A seat whose principal is another seat states nothing until the seat above it is named, and
  // only the repository's history still holds that once the page it stood in is gone.
  const above = parentFromHistory(agentId, roots)
  if (above === null) return { outcome, seat }
  return { outcome: writeSeatPage(stated, seat, above), seat }
}

if (import.meta.main) {
  const report = beat(process.argv.slice(2))
  process.stdout.write(`${JSON.stringify(report)}\n`)
  if (report.outcome.kind === "refused") process.exitCode = 1
}
