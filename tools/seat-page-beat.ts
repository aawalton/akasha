import { resolveRoots } from "../repo/roots/roots.ts"
import { fail } from "./lib/command.ts"
import { type Outcome } from "./lib/gated-write.ts"
import { nameFromHistory, parentFromHistory } from "./lib/seat-page-history.ts"
import { removeSeatPage, writeSeatPage } from "./lib/seat-page.ts"
import { composedNameOf } from "./lib/seat-rename.ts"
import { rotatedOf } from "./lib/seat-rotated-session.ts"
import { keepSession, sessionRecordOf } from "./lib/seat-session.ts"
import { backfillObserved, type Stated, fallBackToHistory, statedOf } from "./lib/seat-stated.ts"
import { keepTranscript, transcriptRecordOf } from "./lib/seat-transcript-path.ts"

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

  backfillObserved(agentId)

  const healing = valueOf(argv, "--self-heal-session")
  if (healing !== null && valueOf(argv, "--self-heal-agent") === agentId) {
    keepSession(agentId, healing)
  }

  const sessionId = valueOf(argv, "--session")
  if (sessionId !== null) {
    const running = sessionRecordOf(sessionId)
    if (running === null) return { outcome: { kind: "unchanged" }, seat }
    keepSession(agentId, running.value)
    return { outcome: writeSeatPage({ ...statedOf(agentId), session: running }, seat), seat }
  }

  const transcriptPath = valueOf(argv, "--transcript")
  if (transcriptPath !== null) {
    const watching = transcriptRecordOf(transcriptPath)
    if (watching === null) return { outcome: { kind: "unchanged" }, seat }
    keepTranscript(agentId, watching.value)
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
  const above = parentFromHistory(agentId, roots)
  if (above === null) return { outcome, seat }
  return { outcome: writeSeatPage(stated, seat, above), seat }
}

if (import.meta.main) {
  const report = beat(process.argv.slice(2))
  process.stdout.write(`${JSON.stringify(report)}\n`)
  if (report.outcome.kind === "refused") process.exitCode = 1
}
