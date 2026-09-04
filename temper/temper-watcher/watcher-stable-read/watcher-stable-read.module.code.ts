import { statSync } from "node:fs"
import { readFileWithRetry } from "../watcher-retry/watcher-retry.module.code.ts"

export const STABILITY_POLL_MS = 1000

export const STABILITY_STABLE_POLLS = 3

export const STABILITY_TIMEOUT_MS = 120_000

export interface StatSnapshot {
  size: number
  mtimeMs: number
}

export interface StableRead {
  content: string
  snapshot: StatSnapshot
}

export interface StabilityOptions {
  pollMs?: number
  stablePolls?: number
  timeoutMs?: number
}

export interface StableReadDeps {
  readonly snapshotOf?: (path: string) => StatSnapshot | null
  readonly readFile?: (path: string) => string
  readonly sleep?: (ms: number) => Promise<void>
  readonly now?: () => number
}

export function looksStructurallyComplete(content: string): boolean {
  return content.trimEnd().endsWith("}")
}

export function isStableRun(observations: readonly StatSnapshot[], required: number): boolean {
  if (observations.length < required) return false
  const tail = observations.slice(-required)
  const first = tail[0]
  if (first === undefined) return false
  return tail.every((o) => o.size === first.size && o.mtimeMs === first.mtimeMs)
}

function snapshotFromDisk(path: string): StatSnapshot | null {
  try {
    const s = statSync(path)
    return { size: s.size, mtimeMs: s.mtimeMs }
  } catch {
    return null
  }
}

export function matchesSnapshot(path: string, snapshot: StatSnapshot): boolean {
  const current = snapshotFromDisk(path)
  return current !== null && current.size === snapshot.size && current.mtimeMs === snapshot.mtimeMs
}

function defaultSleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function readFileWhenStable(
  path: string,
  options?: StabilityOptions,
  deps: StableReadDeps = {}
): Promise<StableRead | null> {
  const pollMs = options?.pollMs ?? STABILITY_POLL_MS
  const stablePolls = options?.stablePolls ?? STABILITY_STABLE_POLLS
  const timeoutMs = options?.timeoutMs ?? STABILITY_TIMEOUT_MS
  const snapshotOf = deps.snapshotOf ?? snapshotFromDisk
  const readFile = deps.readFile ?? ((p: string) => readFileWithRetry(p, "utf-8"))
  const sleep = deps.sleep ?? defaultSleep
  const now = deps.now ?? Date.now
  const deadline = now() + timeoutMs

  let observations: StatSnapshot[] = []
  while (now() <= deadline) {
    const snapshot = snapshotOf(path)
    if (snapshot === null) return null
    observations.push(snapshot)
    if (!isStableRun(observations, stablePolls)) {
      await sleep(pollMs)
      continue
    }
    const content = readFile(path)
    const after = snapshotOf(path)
    if (after !== null && after.size === snapshot.size && after.mtimeMs === snapshot.mtimeMs) {
      return { content, snapshot }
    }
    observations = []
    await sleep(pollMs)
  }
  return null
}
