import { statSync } from "node:fs"
import { readFileWithRetry } from "./retry"

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

function snapshotOf(path: string): StatSnapshot | null {
  try {
    const s = statSync(path)
    return { size: s.size, mtimeMs: s.mtimeMs }
  } catch {
    return null
  }
}

export function matchesSnapshot(path: string, snapshot: StatSnapshot): boolean {
  const current = snapshotOf(path)
  return current !== null && current.size === snapshot.size && current.mtimeMs === snapshot.mtimeMs
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function readFileWhenStable(
  path: string,
  options?: StabilityOptions
): Promise<StableRead | null> {
  const pollMs = options?.pollMs ?? STABILITY_POLL_MS
  const stablePolls = options?.stablePolls ?? STABILITY_STABLE_POLLS
  const timeoutMs = options?.timeoutMs ?? STABILITY_TIMEOUT_MS
  const deadline = Date.now() + timeoutMs

  let observations: StatSnapshot[] = []
  while (Date.now() <= deadline) {
    const snapshot = snapshotOf(path)
    if (snapshot === null) return null
    observations.push(snapshot)
    if (!isStableRun(observations, stablePolls)) {
      await sleep(pollMs)
      continue
    }
    const content = readFileWithRetry(path, "utf-8")
    if (matchesSnapshot(path, snapshot)) return { content, snapshot }
    observations = []
    await sleep(pollMs)
  }
  return null
}
