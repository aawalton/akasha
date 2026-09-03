import { commitPaths } from "@akasha/git/git-committing"
import { whileHoldingLanding } from "@akasha/git/git-landing-lock"
import {
  clearJournal,
  type Queued,
  readJournals,
  rootStands,
  writeJournal,
  writerAlive,
} from "@akasha/pages-system/page-landing-journal"
import { commitAuthor } from "../../agent/commit-author.ts"

export const QUIET_MS = 500

export const CEILING_MS = 5_000

export const LANDING_WAIT_MS = 2_000

export const LANDING_EXIT_WAIT_MS = 5_000

const SLOW_DRAIN_MS = 5_000

const EXIT_ATTEMPTS = 3

const BACKOFF_CEILING_MS = 30_000

export const SPLIT_ATTEMPTS = 3

export const STALL_ATTEMPTS = 6

export const UNLANDED_GRACE_MS = 60_000

export const UNLANDED_SAYS =
  "run `bun tools/unlanded.ts` to see every file standing written but uncommitted, and who wrote it"

const NAMED_CEILING = 4

interface Waiting {
  readonly entries: Map<string, Queued>
  since: number
  timer: ReturnType<typeof setTimeout> | null
  failures: number
  reason: string | null
}

const waiting = new Map<string, Waiting>()

let deferred = false

let lastError: string | null = null

export interface Standing {
  readonly deferred: boolean
  readonly pending: number
  readonly unlanded: number
  readonly stalled: readonly string[]
  readonly oldestUnlandedMs: number | null
  readonly lastError: string | null
}

export function standing(): Standing {
  let pending = 0
  for (const one of waiting.values()) pending += one.entries.size
  let unlanded = 0
  let oldest: number | null = null
  const stalled: string[] = []
  for (const one of readJournals()) {
    const held = Object.values(one.paths)
    unlanded += held.length
    for (const each of held) oldest = oldest === null ? each.at : Math.min(oldest, each.at)
    const orphaned = one.pid !== process.pid && !writerAlive(one.pid)
    if (orphaned || one.attempts >= STALL_ATTEMPTS) stalled.push(one.root)
  }
  return {
    deferred,
    pending,
    unlanded,
    stalled,
    oldestUnlandedMs: oldest === null ? null : Math.max(0, Date.now() - oldest),
    lastError,
  }
}

export function landingsHealthy(one: Standing): boolean {
  if (one.stalled.length > 0) return false
  return one.oldestUnlandedMs === null || one.oldestUnlandedMs < UNLANDED_GRACE_MS
}

export function deferringCommits(): boolean {
  return deferred
}

export function messageFor(acts: ReadonlyMap<string, number>, files: number): string {
  const ordered = [...acts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
  const named = ordered
    .slice(0, NAMED_CEILING)
    .map(([act, count]) => (count === 1 ? act : `${act} x${count}`))
  const rest = ordered.length - named.length
  const more = rest > 0 ? `, and ${rest} more` : ""
  return `pages: ${files} file${files === 1 ? "" : "s"} — ${named.join(", ")}${more}`
}

function waitingIn(root: string): Waiting {
  const held = waiting.get(root)
  if (held !== undefined) return held
  const made: Waiting = {
    entries: new Map(),
    since: Date.now(),
    timer: null,
    failures: 0,
    reason: null,
  }
  waiting.set(root, made)
  return made
}

function nextIn(one: Waiting): number {
  if (one.failures > 0) {
    return Math.min(CEILING_MS * 2 ** Math.min(one.failures, 6), BACKOFF_CEILING_MS)
  }
  return Math.max(0, Math.min(QUIET_MS, CEILING_MS - (Date.now() - one.since)))
}

function schedule(root: string, one: Waiting): void {
  if (one.timer !== null) clearTimeout(one.timer)
  const timer = setTimeout(() => {
    drainRoot(root)
  }, nextIn(one))
  timer.unref?.()
  one.timer = timer
}

function record(root: string, one: Waiting): void {
  if (one.entries.size === 0) {
    clearJournal(root)
    return
  }
  const paths: Record<string, Queued> = {}
  for (const [relPath, each] of one.entries) paths[relPath] = each
  writeJournal({ root, pid: process.pid, attempts: one.failures, reason: one.reason, paths })
}

function nothingStandsUnlanded(): boolean {
  for (const one of waiting.values()) if (one.entries.size > 0) return false
  return readJournals().length === 0
}

function settle(): void {
  if (nothingStandsUnlanded()) lastError = null
}

function saysUnlanded(root: string, files: number, attempts: number, why: string): string {
  const stalling =
    attempts >= STALL_ATTEMPTS
      ? ` This landing has missed ${attempts} attempts and is STALLED, but it is still queued and ` +
        `nothing has been dropped — ${UNLANDED_SAYS}.`
      : ""
  return (
    `${files} file(s) stand written but uncommitted in ${root} after ${attempts} attempt(s): ` +
    `${why}${stalling}`
  )
}

interface Landing {
  readonly made: readonly string[]
  readonly reason: string | null
}

function actsIn(one: Waiting, relPaths: readonly string[]): ReadonlyMap<string, number> {
  const acts = new Map<string, number>()
  for (const relPath of relPaths) {
    const act = one.entries.get(relPath)?.act
    if (act === undefined) continue
    acts.set(act, (acts.get(act) ?? 0) + 1)
  }
  return acts
}

function landTogether(root: string, one: Waiting, relPaths: readonly string[]): Landing {
  const got = commitPaths(
    root,
    relPaths,
    messageFor(actsIn(one, relPaths), relPaths.length),
    commitAuthor()
  )
  return got.ok ? { made: relPaths, reason: null } : { made: got.nothing, reason: got.reason }
}

function landApart(root: string, one: Waiting, relPaths: readonly string[]): Landing {
  const made: string[] = []
  const stuck: string[] = []
  let why: string | null = null
  for (const relPath of relPaths) {
    const got = commitPaths(root, [relPath], messageFor(actsIn(one, [relPath]), 1), commitAuthor())
    if (got.ok) {
      made.push(relPath)
      continue
    }
    made.push(...got.nothing)
    stuck.push(relPath)
    why = why ?? got.reason
  }
  if (stuck.length === 0) return { made, reason: null }
  return {
    made,
    reason:
      `${made.length} path(s) landed one at a time and ${stuck.length} could not, so each bad path ` +
      `now holds only itself — ${stuck.join(", ")}: ${why ?? "no reason was given"}`,
  }
}

function drainRoot(root: string, waitMs: number = LANDING_WAIT_MS): void {
  const one = waiting.get(root)
  if (one === undefined) return
  if (one.timer !== null) {
    clearTimeout(one.timer)
    one.timer = null
  }
  const relPaths = [...one.entries.keys()].sort()
  if (relPaths.length === 0) {
    waiting.delete(root)
    clearJournal(root)
    settle()
    return
  }
  const apart = one.failures >= SPLIT_ATTEMPTS && relPaths.length > 1
  const began = Date.now()
  const outcome = whileHoldingLanding(
    root,
    () => (apart ? landApart(root, one, relPaths) : landTogether(root, one, relPaths)),
    waitMs
  )
  const drained = Date.now() - began
  if (drained >= SLOW_DRAIN_MS) {
    const how = apart ? "one at a time" : "together"
    console.error(
      `[page-commit-queue] slow drain ${root} ${drained}ms — ${relPaths.length} path(s) ${how}`
    )
  }
  const got: Landing = outcome.ok ? outcome.value : { made: [], reason: outcome.reason }
  for (const relPath of got.made) one.entries.delete(relPath)
  if (got.reason === null || one.entries.size === 0) {
    waiting.delete(root)
    clearJournal(root)
    settle()
    return
  }
  one.failures += 1
  one.since = Date.now()
  one.reason = got.reason
  lastError = saysUnlanded(root, one.entries.size, one.failures, got.reason)
  record(root, one)
  schedule(root, one)
}

export function queueCommit(root: string, relPath: string, act: string): void {
  const one = waitingIn(root)
  if (one.entries.size === 0 && one.failures === 0) one.since = Date.now()
  const held = one.entries.get(relPath)
  one.entries.set(relPath, { act, at: held?.at ?? Date.now() })
  record(root, one)
  schedule(root, one)
}

export function drainCommits(attempts: number = 1, waitMs: number = LANDING_WAIT_MS): void {
  for (let attempt = 0; attempt < Math.max(1, attempts); attempt += 1) {
    const roots = [...waiting.keys()]
    if (roots.length === 0) return
    for (const root of roots) drainRoot(root, waitMs)
  }
}

export function recoverLandings(): readonly string[] {
  const taken: string[] = []
  for (const one of readJournals()) {
    if (one.pid === process.pid) continue
    if (writerAlive(one.pid)) continue
    if (!rootStands(one.root)) {
      clearJournal(one.root)
      continue
    }
    const held = waitingIn(one.root)
    for (const [relPath, each] of Object.entries(one.paths)) {
      if (held.entries.has(relPath)) continue
      held.entries.set(relPath, each)
      taken.push(`${one.root}/${relPath}`)
    }
    held.since = Date.now()
    held.failures = Math.max(held.failures, one.attempts)
    held.reason = one.reason
    if (one.reason !== null) {
      lastError = saysUnlanded(one.root, held.entries.size, held.failures, one.reason)
    }
    record(one.root, held)
    schedule(one.root, held)
  }
  return taken
}

export function leaveCommits(): void {
  drainCommits(EXIT_ATTEMPTS, LANDING_EXIT_WAIT_MS)
}

export function deferCommits(): void {
  if (deferred) return
  deferred = true
  recoverLandings()
  process.on("exit", () => {
    leaveCommits()
  })
  for (const signal of ["SIGINT", "SIGTERM"] as const) {
    process.on(signal, () => {
      leaveCommits()
      process.exit(0)
    })
  }
}

export function forgetCommits(): void {
  for (const [root, one] of waiting) {
    if (one.timer !== null) clearTimeout(one.timer)
    clearJournal(root)
  }
  for (const one of readJournals()) if (one.pid === process.pid) clearJournal(one.root)
  waiting.clear()
  deferred = false
  lastError = null
}
