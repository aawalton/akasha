import type { SyncOperation } from "./run-outcome"

type Call = { fn: string; arg?: unknown }

export const calls: Call[] = []

export function track(fn: string, arg?: unknown): undefined {
  calls.push({ fn, arg })
}

export const exportTasks: { modified: boolean; sideHash: string | null; error: Error | null } = {
  modified: false,
  sideHash: null,
  error: null,
}

export const reported: SyncOperation[][] = []

export function reset(): undefined {
  calls.length = 0
  reported.length = 0
}

export function fns(): readonly string[] {
  return calls.map((c) => c.fn)
}
